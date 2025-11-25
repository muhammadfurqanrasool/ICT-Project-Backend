import { Router } from "express";
import {Profile, addFriend, getFriends, getPeople, getProfile} from "../controllers/Profile.controller.js";
import { authenticateJWT } from "../middlewares/AuthMiddleware.js";
const profile = Router();



profile.get("/",authenticateJWT, Profile);
profile.get("/people",authenticateJWT, getPeople);
profile.get("/friends",authenticateJWT, getFriends);
profile.post("/people/add",authenticateJWT, addFriend);
profile.get("/:id",authenticateJWT, getProfile);

export default profile;