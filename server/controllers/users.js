import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "../models/users.js"

export const signin = async (req, res) => {
    const {email, password} = req.body;
    //console.log(email, password);
    try{
        const existingUser = await User.findOne({email:email});
        if(!existingUser) return res.status(404).json({message: 'Not such user'});
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordMatch) return res.status(404).json({message: 'Invalid Password'});
        const token = jwt.sign({email: existingUser.email, id: existingUser._id},'test')
        //console.log(existingUser);
        res.send({existingUser ,token});
    }catch (e){
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const signup = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;
    //res.send(req.body);

    try{
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message:"User already exists"});
        if(password !== confirmPassword) return res.status(400).json({message:"Password mismatching"});
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({email, password:hashedPassword, name:`${firstName} ${lastName}`});
        const token = jwt.sign({email:result.email, id:result._id}, 'test',{expiresIn:"1h"});
        //console.log(token);
        res.send({result, token});
    }catch (e){
        res.status(500).json({message: 'Something went wrong'});
    }
}
