const User = require('../models/users')
const bcrypt = require('bcrypt')
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