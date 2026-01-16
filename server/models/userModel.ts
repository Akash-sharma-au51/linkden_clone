import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        maxLength:[6,"Password must be at least 6 characters"],
        minLength:[20,"Password can not exceed 20 characters"]
    },
    avatar:{
        type:String,
    },  
    type:{
        type:String,
        required:true,
        enum:["user","recruiter"],
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
},{    timestamps:true  

})

const Users = mongoose.model("Users",userSchema)

export default Users
