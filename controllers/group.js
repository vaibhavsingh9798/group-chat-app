const Group = require('../models/group')
const User = require('../models/users')
const UserGroup = require('../models/usergroup')
exports.createGroup = async (req,res)=>{
    let {name} = req.body;
    let {users} = req.body;
    console.log('details..',name,users )
    try{
     if(name && users){
    const group = await Group.create({groupName:name})
    users.map(async (user)=>{
       await group.addUser(user)
    })
    console.log('created')
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
    let user = await User.findByPk(id,{include:{model:Group}})
    if(user){
    let groups = await user.groups
    console.log('groups2...',groups)
    res.status(200).json({groups})
    }
}catch(err){
    res.status(500).json({success:false})
}
}