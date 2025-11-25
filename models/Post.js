import {Schema, model} from "mongoose";


const PostSchema = new Schema({
    user_id : {
        type:Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    author: {
        type:String,
        required:true
    },
    authorPhotoURL: {
        type:String,
        required:true
    },
    captions: {
        type:String,
        required:false,
        default: ""

    },
    photoURL: {
        type:String,
        required: false,
        default: ""
    },
    

}, {timestamps: true});

const Post = model("Post", PostSchema);
export default  Post;
