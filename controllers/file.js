const multer = require('multer')
const S3Service = require('../services/S3services')
const Message = require('../models/messages')

exports.storeFile = async (req,res) =>{
    let {id} = req.user;
    let {name} = req.user;
    let {groupId} = req.params
    let {msg} = req.body;
    let file = req.file
    let fileName = file.originalname
    let fileData = file.buffer
    
  try{
   let url = await S3Service.uploadTos3(fileData,fileName)
    let mediaMsg = await Message.create({name,text:msg,mediaUrl:url,groupId,userId:id})
    res.status(201).json({success:true,mediaMsg})
  }
  catch(err){
    res.status(500).json({success:false})
  }
}

