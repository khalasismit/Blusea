import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import uploadFile from "./controllers/uploadFile.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import postRoute from "./routes/post.js";
import messageRoute from "./routes/message.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
const server = http.createServer(app);
export const io = new Server(server);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

/* ROUTES */

app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/posts', postRoute);
app.use('/message', messageRoute);
/* ROUTES SETUP WHICH USES FILE UPLOAD */

app.use('/', uploadFile);

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 3002;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  server.listen(PORT, () => console.log(`Server Port:${PORT} `));
}).catch((error) => console.log(` ${error} : server did not connect `));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});