let myForm = document.getElementById('loginForm')
myForm.addEventListener('submit',handleFormData)
let token = ''
function handleFormData(e){
    e.preventDefault()
    let email = document.getElementById('email').value  
    let password = document.getElementById('password').value 
    let user = {email,password}
    console.log('user',user)
    login(user)
    document.getElementById('email').value = ''
     document.getElementById('password').value = ''
}

async function login(user){
   let success = true;
   let msg = document.getElementById('err')
    msg.innerHTML=''
    try{
    let response = await axios.post('http://localhost:3003/user/login',{user})
    console.log('resp',response)
     token = response.data.token;
     console.log(token)
    }catch(err){
        console.log('err',err)
        success = err.response.data.success
        msg.innerHTML = err.response.data.message
    }
    if(success){
        // sessionStorage.setItem('token',token)
        localStorage.setItem('token',token)
        alert('Login successful!')
        location.assign('chat2.html')
    }
   

}