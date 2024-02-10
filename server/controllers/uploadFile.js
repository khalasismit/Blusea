import express from "express";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
import admin from "firebase-admin";
import serviceAccount from "../config/serviceacc.json" assert {type: 'json'};
import File from "../models/File.js";
const router = express.Router();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// export const uploadFile = async (req,res) =>{ 
router.post('/upload', upload.single("file"), async (req, res) => {
  try {
    // console.log(req);
    const file = req.file
    // console.log(file);
    const { originalname, buffer, mimetype } = file;
    const bucket = admin.storage().bucket();
    const fileName = `${Date.now()}-${originalname}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: mimetype,
      },
    });

    stream.end(buffer);
    // const downloadUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    const [downloadUrl] = await fileUpload.getSignedUrl({
      action: 'read',
      // Set expires to a very distant future timestamp
      expires: '9999-12-31T23:59:59Z',
    });

    const newFile = new File({
      name: fileName,
      originalName: originalname,
      mimetype: mimetype,
      url: downloadUrl,
    });
    await newFile.save();

    const Img = await File.findOne({ originalName : newFile.originalName })
    const { _id } = Img;
    console.log(_id)
    res.status(200).json(_id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router
