import User from "../models/User.js";
import {InternalServerError} from "../error/error.js"
export async function Profile(Request,Response) {
    // console.log("GET /api/profile")
    const{user_id} = Request;

    try {
        const user = await User.findById(user_id, {fullName:1, email:1, photoURL:1, friends:1, posts:1, createdAt:1})
        if(user) {
            return Response.status(200).json(user);
        }
    } catch (error) {
        
    }
}
export async function getProfile(Request,Response) {

}
export async function getFriends(Request,Response) {
    const {user_id} = Request;

    try {
        const user = await User.findById(user_id, {friends: 1}).populate('friends');
        return Response.status(200).json(user.friends);
    } catch (error) {
        
    }
}
export async function addFriend(Request, Response) {
    const {person_id} = Request.body;
    const {user_id} = Request;
    try {
        await User.findByIdAndUpdate(user_id, {$push: {friends : person_id}});
        await User.findByIdAndUpdate(person_id, {$push: {friends : user_id}});
         Response.status(200).json({message: "Friend Added"})
    } catch (error) {
        InternalServerError(Response,error)
    }
}

export async function getPeople(Request,Response) {
    const {user_id} = Request;
    try {
        const user = await User.findById(user_id);
        const people = await User.find({_id: {$ne: user_id}}, {fullName: 1, photoURL:1, _id:1, status:1});
        return Response.status(200).json(people);
    } catch (error) {
        InternalServerError(Response, error)
    }
}