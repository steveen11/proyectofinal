import User from "../entities/user.entity.js"
import bcrypt from "bcrypt"
import mongoose from "mongoose"

export const userRegister = async (req,res)=>{
    const{ firstName,
        lastName,
        email,
        password,
        isAdmin
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
            isAdmin
        })
        res.status(201).json(newUser)
     
    }
}

export const loginRegister = (req,res)=>{
    res.send("login de usuarios")
}