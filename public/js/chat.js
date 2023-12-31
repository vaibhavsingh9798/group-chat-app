// const socket = io();

const groupDetail = JSON.parse(localStorage.getItem('groupDetail'))

// socket.on('connect', ()=>{
//     console.log('Server is Printing it to the client side',socket.id)
//      const groupId = groupDetail.groupId
//     socket.emit('joinRoom', groupId)
// })

// socket.on('receivedMsg',(msg)=>{
//   console.log('soMsg',msg)
//   printMsg(msg);
//  }) ;

let token = localStorage.getItem('token')
let btn = document.getElementById('createBtn')
btn.addEventListener('click',handleClick)

let sendBtn = document.getElementById('sendBtn') 
sendBtn.addEventListener('click',handleMessage)

let groupId;
let userId = localStorage.getItem('rootAdmin')
console.log('data...',userId)
async function handleClick(e){
  e.preventDefault();
  location.assign('group.html')
}

// hande user send messages
async function handleMessage(e){
  e.preventDefault()
  let msg = document.getElementById('msg').value
  document.getElementById('msg').value=""
  console.log('msg',msg,token)

  let mediaFile = document.getElementById('myFile')
  let file = mediaFile.files[0] 
  
  try{
      if(!file){
   let {data} = await axios.post('http://localhost:3003/message/',{msg,groupId},{headers:{"Authorization":token}})
   console.log('msg resp...',data,data.message.text)
  //  socket.emit('message', data.message.text);
      }
      else{
        let formData = new FormData();
        formData.append('myFile',file)
        formData.append('msg',msg)
        let {data} = await axios.post(`http://localhost:3003/file/${groupId}`,formData,{headers:{"Authorization":token,'Content-Type': 'multipart/form-data'}}) 
        console.log('msg resp...',data)
          //  socket.emit('message', data.mediaMsg.mediaUrl);
          // socket.emit('message', data.mediaMsg.text);
       
      }
  }catch(err){
      console.log(err)
  }
}

document.addEventListener('DOMContentLoaded',async ()=>{
  let groups;
    try{
    let {data} = await axios.get('http://localhost:3003/group/all',{headers:{"Authorization":token}})
     groups = data.groups
    }catch(err){
      console.log(err)
    }
    let ul = document.getElementById('groupList')
    groups.map((group,ind) =>{ 
      let li = document.createElement('li')
      li.setAttribute('class','group-item')
      li.setAttribute('id',group.id)
      li.appendChild(document.createTextNode(`${group.groupName}`))
      ul.appendChild(li)
    })

    let lists = document.querySelectorAll('.group-list .group-item')
    console.log(lists)

    let parDiv = document.getElementById('msg-box')
    parDiv.innerHTML=""
    lists.forEach((list,ind1) =>{
        list.addEventListener('click',async () =>{  
          parDiv.innerHTML=""
          console.log('click',list)
          groupId = list.getAttribute('id')
         let groupName = list.textContent
         localStorage.setItem('groupDetail',JSON.stringify({groupName,groupId}))
    
        let messages;
          try{
          let {data} = await axios.get(`http://localhost:3003/message/${groupId}`,{headers:{"Authorization":token}})
          messages = data.messages
          messages.map((item,ind2) =>{ 
          printMsg(item)
          })
          // console.log('msg..',messages)
          }catch(err){
            console.log(err)
          }
  
        })   
    })
})

let detailsBtn = document.getElementById('detailsBtn')
detailsBtn.addEventListener('click',() =>{
  console.log('click')
  location.assign('groupdetails.html')
})

function printMsg(item){
  let parDiv = document.getElementById('msg-box')
 
    let msgDiv  = document.createElement('div')
    msgDiv.setAttribute('class','message')
    let nameDiv = document.createElement('div')
    nameDiv.setAttribute('class','sender')
   nameDiv.appendChild(document.createTextNode(`${item.name}`))
   msgDiv.appendChild(nameDiv)
   if(item.mediaUrl){
         const mediaDiv = document.createElement('div');
const mediaItem = item.mediaUrl.endsWith('.mp4')
? document.createElement('video')
: document.createElement('img');
  
 mediaItem.src = item.mediaUrl
 mediaItem.controls = true // video
 mediaDiv.appendChild(mediaItem)
msgDiv.appendChild(mediaDiv)
 //parDiv.appendChild(mediaDiv)
   }
   msgDiv.appendChild(document.createTextNode(`${item.text}`))
   parDiv.appendChild(msgDiv)
}

 