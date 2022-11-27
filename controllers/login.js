const {User,Post} = require('../models/blogger')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signUp =async (req,res) =>{
    try{    
        const {name,email,passwordHash}  = req.body;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(passwordHash,salt);
        const user = await User.create({name,email,passwordHash:password});
        const token = jwt.sign({userId:user.id,name:user.name},process.env.JWT_SECRET,{expiresIn:'30d'});
        res.status(200).json( {user:{name:user.name},token});
        
    }catch(error)
    {
        console.log(error);
        res.status(400).json({msg:'Provide Valid Credentials'});
    }
}
const signIn =async (req,res) =>{
    
    try{
    const {email,passwordHash} = req.body;
    const auth = await User.findOne({
        where:{
            email: email
        }
    });
    if(await bcrypt.compare(passwordHash,auth.passwordHash)&&auth){

        const token = jwt.sign({userId:auth.id,name:auth.name},process.env.JWT_SECRET,{expiresIn:'30d'});
        res.status(200).json( {user:{name:auth.name},token});
        
    }else{
        throw ('password or email incorrect');
    }
} 
catch(error)
{
    console.log(error);
    res.status(401).json({msg:'Invalid Credentials'});
}

}

module.exports = {
    signIn,
    signUp
}


  