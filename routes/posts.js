import {Router} from "express";
import { createPost, getPosts } from "../controllers/Post.controller.js";
import { authenticateJWT } from "../middlewares/AuthMiddleware.js";

const posts = Router();

posts.post("/create",authenticateJWT, createPost);
posts.get("/",authenticateJWT ,getPosts);
// post.get("/:id")

export default posts;