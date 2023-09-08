let token = localStorage.getItem('token')
let rootUserId = localStorage.getItem('rootAdmin')
let isRootUserAdmin = false
let {groupName,groupId} = JSON.parse( localStorage.getItem('groupDetail') )
let groupDetails = document.getElementById('groupName')

let users;
  document.addEventListener('DOMContentLoaded',handleDomLoaded)
  async function handleDomLoaded(e) {
    e.preventDefault()
     groupDetails.appendChild(document.createTextNode(`${groupName}`)) 
 
   
    try{
    let {data} = await axios.get(`http://localhost:3003/group/members/${groupId}`,{headers:{"Authorization":token}})
    users = data.members
    }catch(err){
      console.err(err)
    }
    let ul = document.getElementById('groupMember')
    users.map( user => {
      if(rootUserId == user.id){
      isRootUserAdmin = user.isAdmin
      }
    let li = document.createElement('li')
    li.setAttribute('class','list-group-item bg-dark text-secondary')
    li.setAttribute('data-user',`${user.id}`)
    li.appendChild(document.createTextNode(`${user.username}`)) 
    let btn1 = document.createElement('button')
    btn1.setAttribute('id',user.id)
    if(!user.isAdmin){
      btn1.setAttribute('class','make btn btn-secondary float-right')
    btn1.appendChild(document.createTextNode('Make group admin'))
    }
    else{
      btn1.setAttribute('class','dismiss btn btn-secondary float-right')
    btn1.appendChild(document.createTextNode('Dismiss as Admin'))
    }
    li.appendChild(btn1)
    let btn2 = document.createElement('button')
    btn2.setAttribute('id',user.id)
    btn2.setAttribute('class','remove btn btn-secondary mr-2 float-right')
    btn2.appendChild(document.createTextNode('Remove'))
    li.appendChild(btn2)
    ul.appendChild(li)
    li.addEventListener('click',handleClickLi)
    })
  
}

async function handleClickLi(e){
    e.preventDefault();
    let userId = e.target.getAttribute('id')
    let details = {userId,groupId}
    let classVal = e.target.getAttribute('class')
    try{
      if(isRootUserAdmin || users.length == 1){
  if(classVal == 'make btn btn-secondary float-right'){
       let {data} = await axios.post(`http://localhost:3003/group/makeadmin`,details,{headers:{"Authorization":token}})
       handleDomLoaded(e)
  }
  else if(classVal == 'dismiss btn btn-secondary float-right'){
        let {data} = await axios.post(`http://localhost:3003/group/dismissadmin`,details,{headers:{"Authorization":token}})
        handleDomLoaded(e)
  }
  else if(classVal == 'remove btn btn-secondary mr-2 float-right'){
       let {data} = await axios.post(`http://localhost:3003/group/removemember`,details,{headers:{"Authorization":token}})
       handleDomLoaded(e) 
  }
}
}catch(err){
  console.err('err',err)
}
}

let goToHome = document.getElementById('homeBtn')
goToHome.addEventListener('click',async(e)=>{
  location.assign('../CHAT/chat.html')
})


