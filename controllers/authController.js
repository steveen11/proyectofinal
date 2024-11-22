import User from "../entities/user.entity.js"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import jwt from 'jsonwebtoken'


const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}

export const userRegister = async (req,res)=>{
    const{ firstName,
        lastName,
        email,
        password,
        isAdmin,
    } = req.body
    const vUser = await User.findOne({email: req.body.email})
    if (vUser) {
        res.status(400).json({message: "Email ya registrado"})
    }else{
        //encriptar password
        const sal = await bcrypt.genSalt(10)
        const bcPassword = await bcrypt.hash(password,sal)
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: bcPassword,
            isAdmin,
        })
        const token = generateToken(newUser._id)
        res.status(201).json({...newUser._doc,token})
     
    }

}

export const loginUser = async(req,res)=>{
    const{email, password} = req.body
    const user =  await User.findOne({email: email})
if (user) {
    if (await bcrypt.compare(password,user.password)) {
        res.status(200).json({
            id:user._id,
            name:user.firstName,
            token: generateToken(user._id)
        })
} else {
    res.send("Credencialdes invalidas")
}  
}  
else{
    res.status(404).json({
        "message": "credenciales invalidas"
    })
}
}

