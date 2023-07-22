let btn = document.getElementById('btn')
btn.addEventListener('click',handleMessage)
let token = sessionStorage.getItem('token')
let rootUserId;
async function handleMessage(e){
    e.preventDefault()
    let msg = document.getElementById('msg').value
    document.getElementById('msg').value=""
    console.log('msg',msg,token)
    try{
    let response = await axios.post('http://localhost:3003/message/',{msg},{headers:{"Authorization":token}})
     console.log('msg resp',response)
     getMessages()
    }catch(err){
        console.log(err)
    }
    
}

document.addEventListener('DOMContentLoaded',onDomLoad)

async function onDomLoad(){
    let user;
    try{
        let response = await axios.get('http://localhost:3003/user/loginUser',{headers:{"Authorization":token}})
        console.log('all user login',response)
        user =  response.data.response
        rootUserId = user[0].userId;
       console.log('user--',user)
    }catch(err){
        console.log(err)
    }
    const firstUl = document.getElementById('login-list');
    const secondUl = document.getElementById('msg-list');
    if (firstUl && secondUl) {
      secondUl.parentNode.insertBefore(firstUl, secondUl);
    }

    for(let i=0;i<user.length;i++){
    let li = document.createElement('li')
    if(i%2 == 0)
    li.setAttribute('class','list-group-item list-group-item-info text-left')
    else
    li.setAttribute('class','list-group-item list-group-item-dark text-left')
    if(i == 0)
    li.appendChild(document.createTextNode('You joined'))
    else
    li.appendChild(document.createTextNode(`${user[i].name} joined`))
    firstUl.appendChild(li)
    getMessages()
    } 
    
}

async function getMessages(){
    let ul = document.getElementById('msg-list')
    ul.innerHTML=''
    try{
    let {data} = await axios.get('http://localhost:3003/message',{headers:{"Authorization":token}}) 
    console.log('msg resp123',data)
    let messages = data.response
    messages.map(msg => printMessage(msg))
    }catch(err){
        console.log(err)
    }
}

function printMessage(msg){
    let ul = document.getElementById('msg-list')
    
    let li = document.createElement('li')
    if(msg.senderId == rootUserId){
    li.setAttribute('class','list-group-item list-group-item-info text-left')
    li.appendChild(document.createTextNode(`You: ${msg.text}`))
    }
    else{
    li.setAttribute('class','list-group-item list-group-item-dark text-left')
    li.appendChild(document.createTextNode(`${msg.name}: ${msg.text}`))
    }
    ul.appendChild(li)
     
}