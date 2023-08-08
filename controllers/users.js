const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Login = require('../models/login')
const saltRounds = 10; 

exports.createUser = async (req,res,next) =>{
    let {name,email,phoneNumber,password} = req.body.user
    try{
    let hasedPassword = await bcrypt.hash(password,saltRounds)
    let oldUser = await User.findOne({where:{email:email}})
    if(!oldUser){
            let response = await User.create({name,email,phoneNumber,password:hasedPassword})
            res.status(201).json({success:true,resp:response})
        }
    else{
        res.status(400).json({success:false,message:'User already exist'})
        console.log('exist user')
    }
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.loginUser = async (req,res) =>{
     let {email,password} = req.body.user
     try{
     let user = await User.findOne({where:{email:email}})
     console.log('user--',user)
     if(!!user){
         let matchPassword = await bcrypt.compare(password,user.password)
         if(!!matchPassword){
            res.status(200).json({success:true,token:genrateToken(user.id)})
         }
         else{
            res.status(401).json({success:false,message:'Incorrect password'})
         }
     }
     else{
        res.status(404).json({success:false,message:"The email address you entered isn't connected to an account."})
     }
     }catch(err){
        res.status(500).json({error: 'Internal server error'})
     }
}

 function genrateToken(id){
    console.log()
   const token =  jwt.sign({id:id},process.env.JWT_SECRETKEY)
   console.log('id,sc,token',id,process.env.JWT_SECRETKEY,token)
   return token;
}

exports.allLoginUser = async (req,res) => {
    try{
   let response = await Login.findAll()
   if(response)
   res.status(200).json({success:true,response:response})
    }
    catch(err){
        res.status(500).json({message:"Internal Error"})
    }
   
}

exports.allUser = async (req,res) => {
    try{
   let response = await User.findAll()
   if(response)
   res.status(200).json({success:true,response:response})
    }
    catch(err){
        res.status(500).json({message:"Internal Error"})
    }
   
}