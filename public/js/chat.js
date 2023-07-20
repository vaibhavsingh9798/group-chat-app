let btn = document.getElementById('btn')
btn.addEventListener('click',handleMessage)

function handleMessage(e){
    e.preventDefault()
    let msg = document.getElementById('msg').value
    document.getElementById('msg').value=""
    console.log('msg',msg)
    if(msg){
    let ul = document.getElementById('msg-list')
    let li = document.createElement('li')
    li.setAttribute('class','list-group-item list-group-item-info text-left')
    li.appendChild(document.createTextNode(`You : ${msg}`))
    ul.appendChild(li)
    }
}

document.addEventListener('DOMContentLoaded',onDomLoad)

function onDomLoad(){
    let ul = document.getElementById('msg-list')
    let li = document.createElement('li')
    li.setAttribute('class','list-group-item list-group-item-info text-left')
    li.appendChild(document.createTextNode('You joined'))
    ul.appendChild(li)
    
}