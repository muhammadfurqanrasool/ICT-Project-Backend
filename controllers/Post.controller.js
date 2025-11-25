import { InternalServerError } from "../error/error.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export async function createPost(Request, Response) {
    const { captions, photoURL} = Request.body;
    const {user_id} = Request;

    if(!user_id || !captions) {
        return Response.status(403).json({message: "Incomplete params"});
    }
    try {
        const user = await User.findById(user_id);
        const post = new Post({
            user_id:user_id,
            author: user.fullName,
            authorPhotoURL: user.photoURL,
            captions,
            photoURL : photoURL? photoURL : ""
        });
        user.posts.push(post._id);
        await user.save();
        await post.save();
        return Response.status(200).json(post);
    } catch (error) {
       InternalServerError(Response,error); 
    }
}
export async function getPosts(Request, Response) {
    try {
        const posts = await Post.find();
        posts.reverse();
        // console.log(posts);
        return Response.status(200).json({posts});
    } catch (error) {
        InternalServerError(Response,error);
    }
}