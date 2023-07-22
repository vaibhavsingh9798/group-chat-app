const Message = require('../models/messages')

exports.postMessage = async (req,res)=>{
  let msg = req.body.msg
  let id = req.user.id;
  let name = req.user.name;
  console.log('msg post',msg,id,name)
   try{
     let response = await Message.create({text:msg,name:name,senderId:id})
     console.log('resp--',response)
     res.status(201).json({success:true,response:response})
   }catch(err){
    console.log('err',err)
    res.status(500).json({message:'Internl Error post'})
   }  
}

exports.getMessage = async (req,res)=>{
   try{
     let response = await Message.findAll()
     res.status(201).json({success:true,response:response})
   }catch(err){
    res.status(500).json({message:'Internl Error get'})
   }  
}