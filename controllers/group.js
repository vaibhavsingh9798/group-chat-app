const Group = require('../models/group')
const User = require('../models/users')
const UserGroup = require('../models/usergroup')
exports.createGroup = async (req,res)=>{
    let {name} = req.body;
    let {users} = req.body;
    let {id} = req.user;
    console.log('details..',name,users,id)
    try{
     if(name && users){
    const group = await Group.create({groupName:name})
    console.log('createdg...',group,group.id)
    users.map(async (userId)=>{
        let user = await User.findByPk(userId)
        if(userId == id)
        await user.addGroup(group,{ through: { isAdmin: true } })  
        else
        await user.addGroup(group,{ through: { isAdmin: false } })   // { through: { isAdmin: true } }
    })
    // Add the user to the group with isAdmin set to true

    console.log('created...')
  //  res.json(201).json({success:true})
} 
    }catch(err){
        console.log(err)
        res.json(500).json({success:false})
    }
}
exports.getGroup = async (req,res) =>{
    let {id} = req.user 
    console.log('id..',id)
    try{
    let user = await User.findByPk(id,{include:{model:Group}}) // Include UserGroup attributes
    if(user){
    let groups = await user.groups
    console.log('groups2...',groups)
    res.status(200).json({groups})
    }
}catch(err){
    res.status(500).json({success:false})
}
}

exports.getGroupMember = async (req,res) =>{
    let {groupId} = req.params
    console.log('gid....',groupId)
    try{
    const groupUsers = await Group.findByPk(groupId, {
      include: [
        {
          model: User,
          attributes: ['id','name'],
          through: {
            attributes: ['isAdmin'],
          },
        },
      ],
    })
    let members = groupUsers.users.map(user => {
      console.log('user--',user)
      return {
        id:user.id,
        username: user.name,
        isAdmin: user.usergroup.isAdmin,
      };
    });
    console.log('mem2...',members)
    res.status(200).json({members})
  }catch(err){
    res.status(500).json({success:false})
  }
}

exports.makeAdmin = async (req,res) =>{
  let {userId,groupId} = req.body
  console.log('makeAdmin',userId,groupId)
  try{
  let response = await UserGroup.update({isAdmin:true},{where:{userId,groupId}})
}catch(err){
  res.status(500).json({success:false})
}
}


exports.dismissAdmin = async (req,res) =>{
  let {userId,groupId} = req.body
  console.log('dismissAdmin',userId,groupId)
  try{
  let response = await UserGroup.update({isAdmin:false},{where:{userId,groupId}})
  }catch(err){
    res.status(500).json({success:false})
  }
}


exports.removeMember = async (req,res) =>{
  let {userId,groupId} = req.body
  console.log('removeMember',userId,groupId)
  try{
  let res = await User.destroy({where:{id:userId}})
  }catch(err){
    res.status(500).json({success:false})
  }

}

exports.removeGroup = async (req,res) =>{
   let {groupId} = req.params;
   try{
   let response = await Group.destroy({where:{id:groupId}})
   console.log('groupId destroy',groupId)
   }catch(err){
    res.status(500).json({status:false})
   }
}