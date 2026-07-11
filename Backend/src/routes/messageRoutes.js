import express from "express";
import { getUsersForSideBar } from "../controller/messageController.js";
import { protectRoute } from "../Middleware/authMiddleware.js";
import { getConversationsForSideBar } from "../controller/messageController.js";
import { getMessages } from "../controller/messageController.js";
import { sendMessages } from "../controller/messageController.js";
import { upload } from "../Middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protectRoute);

router.get('/users', getUsersForSideBar);
router.get('/conversations', getConversationsForSideBar);
router.get('/:id', getMessages);
router.post('/send/:id', upload.single("media"), sendMessages);

export default router