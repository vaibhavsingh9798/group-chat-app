const Message = require('../models/messages')

exports.postMessage = async (req,res)=>{
  let {msg} = req.body;
  let {id} = req.user;
  let {name} = req.user;
  let {groupId} = req.body;
  console.log('msg post',msg,id,name,groupId)
   try{
     let message = await Message.create({text:msg,name:name,groupId,userId:id})
     console.log('resp--',message)
     res.status(201).json({success:true,message})
   }catch(err){
    console.log('err',err)
    res.status(500).json({message:'Internl Error post'})
   }  
}

exports.getMessage = async (req,res)=>{
   let {groupId} = req.params;
   console.log('id..',groupId)
   try{
     let messages = await Message.findAll({where:{groupId:groupId}})
     res.status(201).json({success:true,messages})
   }catch(err){
    res.status(500).json({message:'Internl Error get'})
   }  
}