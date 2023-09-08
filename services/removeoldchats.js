const cron = require('node-cron')
const Message = require('../models/messages')
const ArchivedChat = require('../models/archivedchat')

async function cornShedule(){

cron.schedule('0 0 * * *',async function(){
   try{
    let chats = await Message.findAll()
      for(let chat of chats){
         await ArchivedChat.create({name:chat.name,text:chat.text,mediaUrl:chat.mediaUrl,groupId:chat.groupId,userId:chat.userId})
         await Message.destroy({where:{id:chat.id}})
      }
       
   }catch(err){
    console.error(err)
   }
})
}

module.exports = cornShedule