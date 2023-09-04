const jwt = require('jsonwebtoken')
const User = require('../models/users')
const Login = require('../models/login')

const authonticate = async (req,res,next)=>{
    let token = req.headers.authorization || '' 
    let {id} = jwt.verify(token,process.env.JWT_SECRETKEY)
    try{
        if(id){
           let user = await User.findByPk(id)
           if(user){
             req.user = user;
             let exist = await Login.findOne({where:{userId:user.id}})
             if(!exist)
            await Login.create({name:user.name,userId:user.id})
             next()
           }
        } 
        else{
            res.status(400).json({message:'authontication failed'})
        }
    }catch(err){
        res.status(500).json({message:'Internal server error'})
    }
}

module.exports = {authonticate};