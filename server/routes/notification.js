import express from "express";
import { delNotif, getNotif, newNotif } from "../controllers/notification.js";

const router = express.Router()

router.post("/new",newNotif);
router.post("/deleteLike",delNotif);
router.post("/deleteComment",delNotif);
router.get("/:userId",getNotif);

export default router