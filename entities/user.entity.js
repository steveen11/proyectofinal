import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        require:{true:"Nombre requerido"}
    },
    lastName:{
        type:String,
        require:{true:"Apellido requerido"}
    },
    email:{
        type:String,
        require:{true:"Nombre requerido"},
        unique:[true, "username no debe ser repetido"],
    },
    password:{
        type: String,
        requiere: {true: "password requerida"}
    },
    isAdmin:{
        type: Boolean,
        require: {true: "Is admin es requerido"},
        default: false
    }

},
{
    timestamps: true
})

const User = mongoose.model("Users", userSchema)

export default User