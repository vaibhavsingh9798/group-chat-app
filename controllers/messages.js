const Message = require('../models/messages')

exports.postMessage = async (req,res)=>{
  let {msg} = req.body;
  let {id} = req.user;
  let {name} = req.user;
  let {groupId} = req.body;
   try{
     let message = await Message.create({text:msg,name:name,groupId,userId:id})
     res.status(201).json({success:true,message})
   }catch(err){
    res.status(500).json({message:'Internl Error post'})
   }  
}

exports.getMessage = async (req,res)=>{
   let {groupId} = req.params;
   try{
     let messages = await Message.findAll({where:{groupId:groupId}})
     res.status(201).json({success:true,messages})
   }catch(err){
    res.status(500).json({message:'Internl Error get'})
   }  
}