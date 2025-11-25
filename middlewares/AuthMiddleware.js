import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { InternalServerError } from "../error/error.js";

dotenv.config();

const JWT_TOKEN = 'authToken';
const SECRET_KEY = process.env.SECRET_KEY;

export const authenticateJWT = (Request, Response, Next) => {
    const token = Request.cookies[JWT_TOKEN];
    if (!token) {
        return Response.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        Request.user_id = decoded?.user_id; 
        Next(); 

    } catch (error) {
        console.error('JWT verification failed:', error.message);
        // clearAuthCookie(Response);
        return Response.status(401).json({ message: 'Invalid or expired token.' });
    }
};

export async function clearAuthCookie(Response) {
    Response.cookie(JWT_TOKEN, '', {
        httpOnly:true,
        secure:true,
        samesite:'lax',
        expires: new Date(0)
    })
}

export async function setAuthCookie(Response,id){
    const payload = {user_id: id};
    const token = jwt.sign(payload,SECRET_KEY, {
        expiresIn: '7d'
    });
    try {
            Response.cookie(JWT_TOKEN, token , {
                httpOnly:true,
                secure:true,
                samesite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
                }); 

    } catch (error) {
        console.log(error);
        InternalServerError(Response,error)
    }
}