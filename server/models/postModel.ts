import mongoose from "mongoose"


const postModel = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    },
    likes:{
        type:[mongoose.Schema.Types.ObjectId],
        default:[]
    }
},{    timestamps:true  

})

const Post = mongoose.model("Post",postModel)

export default Post
