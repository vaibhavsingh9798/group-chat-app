const multer = require('multer')
const S3Service = require('../services/S3services')
const GroupFiles = require('../models/groupFiles')
const Message = require('../models/messages')


exports.storeFile = async (req,res) =>{
    let {id} = req.user;
    let {name} = req.user;
    let {groupId} = req.params
    let {msg} = req.body;
    let file = req.file
    let fileName = file.originalname
    let fileData = file.buffer
    
  console.log('file details...',fileName,fileData)
  console.log('groupId...',groupId,msg)
  try{
   let url = await S3Service.uploadTos3(fileData,fileName)
   console.log('url...',url)
    let mediaMsg = await Message.create({name,text:msg,mediaUrl:url,groupId,userId:id})
    res.status(201).json({success:true,mediaMsg})
  }
  catch(err){
    console.log(err)
  }
}

