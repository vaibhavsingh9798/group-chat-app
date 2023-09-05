
let myForm = document.getElementById('loginForm')
myForm.addEventListener('submit',handleFormData)
let token = ''
function handleFormData(e){
    e.preventDefault()
    let email = document.getElementById('email').value  
    let password = document.getElementById('password').value 
    let user = {email,password}
    login(user)
    document.getElementById('email').value = ''
     document.getElementById('password').value = ''
}

async function login(user){
   let success = true;
   let msg = document.getElementById('err')
    msg.innerHTML=''
    try{
    let response = await axios.post(`http://16.170.218.137:3003/user/login`,{user})
     token = response.data.token;
     localStorage.setItem('rootAdmin',response.data.userId)
    }catch(err){
        console.err(err)
        success = err.response.data.success
        msg.innerHTML = err.response.data.message
    }
    if(success){
        localStorage.setItem('token',token)
        alert('Login successful!')
        window.location.href='../CHAT/chat.html'
    }
   

}