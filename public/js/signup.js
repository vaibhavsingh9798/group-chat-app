let myForm = document.getElementById('signupForm')
myForm.addEventListener('submit',handleFormData)

function handleFormData(e){
    e.preventDefault()
    let name = document.getElementById('name').value 
    let email = document.getElementById('email').value 
    let phoneNumber = document.getElementById('phoneNumber').value 
    let password = document.getElementById('password').value 
    let user = {name,email,phoneNumber,password}
    console.log('user',user)
    signup(user)
     document.getElementById('name').value = ''
    document.getElementById('email').value = ''
    document.getElementById('phoneNumber').value = ''
     document.getElementById('password').value = ''
}

async function signup(user){
   let success = true;
   let msg = document.getElementById('err')
    msg.innerHTML=''
    try{
    let response = await axios.post('http://localhost:3003/user/signup',{user})
    console.log('resp',response)
     
    }catch(err){
        console.log('err',err)
        success = err.response.data.success
        msg.innerHTML = err.response.data.message
    }

    if(success)
    alert('Signup successful!')

}