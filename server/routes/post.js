import express from "express";
import { create , Feed ,toggleLike } from "../controllers/post.js";

const router = express.Router();

router.get("/",Feed);
router.post("/new",create);
router.put("/:postId/like/:userId",toggleLike);

export default router;
