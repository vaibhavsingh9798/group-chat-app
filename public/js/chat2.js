let btn = document.getElementById('createBtn')
btn.addEventListener('click',handleClick)

let sendBtn = document.getElementById('sendBtn') 
sendBtn.addEventListener('click',handleMessage)

let token = localStorage.getItem('token')
console.log('token',token)
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
  try{
      if(msg){
  let {data} = await axios.post('http://localhost:3003/message/',{msg,groupId},{headers:{"Authorization":token}})
   console.log('msg resp...',data)
  // setMsgInLocal(response.data.response)
  // getMsgFromLocal()
      }
  }catch(err){
      console.log(err)
  }
}

document.addEventListener('DOMContentLoaded',async ()=>{
    // use axios.get find group
    let {data} = await axios.get('http://localhost:3003/group/all',{headers:{"Authorization":token}})
    console.log('all g',data.groups)
    let groups = data.groups//['Group11','Group22','Group33']
    // message 
    let messages 
  //   [ 
  //   [{name:'rahul',message:'how are you guys'},
  //   {name:'vaibhav',message:'I am good'},
  //   {name:'gagan',message:'I am fine'}],

  //   [{name:'APS',message:'did you drink water'},
  //   {name:'vivek',message:'Yes I did  drink water'},
  //   {name:'Vicky',message:'please give me food'}
  //   ]
  // ]
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
    

    // <div class="chat-box border">
    //                         <div class="message">
    //                             <div class="sender">vaibhav</div>
    //                             Hello there! Hi! How are you
    //                         </div>
    let parDiv = document.getElementById('msg-box')
    parDiv.innerHTML=""
    lists.forEach((list,ind1) =>{
        list.addEventListener('click',async () =>{  
          parDiv.innerHTML=""
          console.log('click',list)
          groupId = list.getAttribute('id')
         let groupName = list.textContent
         localStorage.setItem('groupDetail',JSON.stringify({groupName,groupId}))
         console.log('group..',groupName)
          console.log('id', groupId)
          try{
          let {data} = await axios.get(`http://localhost:3003/message/${groupId}`,{headers:{"Authorization":token}})
          messages = data.messages
          console.log('msg..',messages)
          }catch(err){
            console.log(err)
          }
           messages.map((item,ind2) =>{ 
            let chDiv1  = document.createElement('div')
            chDiv1.setAttribute('class','message')
            let chdiv2 = document.createElement('div')
            chdiv2.setAttribute('class','sender')
           chdiv2.appendChild(document.createTextNode(`${item.name}`))
           chDiv1.appendChild(chdiv2)
           chDiv1.appendChild(document.createTextNode(`${item.text}`))
           parDiv.appendChild(chDiv1)
          })
        })
        
    })

})

let detailsBtn = document.getElementById('detailsBtn')
detailsBtn.addEventListener('click',() =>{
  console.log('click')
  location.assign('groupdetails.html')
})