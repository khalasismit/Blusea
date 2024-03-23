import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import uploadFile from "./controllers/uploadFile.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import postRoute from "./routes/post.js";
import messageRoute from "./routes/message.js";
import notifRoute from "./routes/notification.js"
import { app, server } from "./socket/socket.js";
import File from "./models/File.js";
import { verifyToken } from "./middleware/verifyToken.js";

/* CONFIGURATIONS */
dotenv.config();
app.use(express.json());
app.use(cors({
  origin:"*"
}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*","http://localhost:3000","http://localhost:3003","https://storage.googleapis.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

/* ROUTES */
app.use('/auth', authRoute);
app.use('/users',verifyToken,userRoute);
app.use('/posts',verifyToken,postRoute);
app.use('/chats',verifyToken,messageRoute);
app.use('/notifications',verifyToken,notifRoute);
app.get("/files",async(req,res)=>{
  try {
  const files = await File.find();
  res.status(200).json(files);
} catch (error) {
  res.status(400).json(error);
  }
})
/* ROUTES SETUP WHICH USES FILE UPLOAD */
app.use('/',verifyToken,uploadFile);

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 3002;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  server.listen(PORT, () => console.log(`Server Port:${PORT} `));
}).catch((error) => console.log(` ${error} : server did not connect `));
