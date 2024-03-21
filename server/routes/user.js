import express from "express";

import { getUsers, getUser, getFollowing, getFollowers, knownUsers, getUserSavedPost, searchUser, suggestions, edit, search, getUserToReply, deleteUser } from "../controllers/user.js"
import { follow, accept, reject, cancel, unfollow, requests } from "../controllers/follow.js";

const router = express.Router();

router.get("/",getUsers);
router.get("/:userName",getUser);
router.get("/suggestions/:userId",suggestions);
router.get("/userToReply/:commentId",getUserToReply);
router.get("/:id/search/:search",searchUser);
router.get("/search/:search",search);
router.get("/:id/knownUsers",knownUsers);
router.patch("/edit/:id",edit);
router.post("/deleteuser/:id",deleteUser);
router.get("/:userId/posts/saved",getUserSavedPost);

router.get("/:userName/followers",getFollowers);
router.get("/:userName/following",getFollowing);
router.get("/:id/requests",requests)

// SEND_FOLLOW_REQUEST - ACCEPT_REQUEST - REJECT_REQUEST
router.put("/:userId/follow-request/:followId",follow);
router.put("/:userId/follow-request/:followId/accept",accept);
router.put("/:userId/follow-request/:followId/reject",reject);

// CANCEL_FOLLOW_REQUEST [ follower decided to cancel follow_request ( for a reason ) ]
// request already sent but now user want to cancel that request
router.put("/:userId/follow-request/:followId/cancel",cancel);

//UNFOLLOW
router.put("/:userId/unfollow/:followId",unfollow);

export default router;