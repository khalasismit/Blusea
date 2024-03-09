import express from "express";
import multer from "multer";
import sharp from "sharp";
import cors from "cors";
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

router.use(cors());
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
// export const uploadFile = async (req,res) =>{ 
router.post('/upload', upload.single("file"), async (req, res) => {
  try {
    // console.log(req);
    const file = req.file
    const compressedImageBuffer = await sharp(file.buffer)
    .rotate()
    .resize({ width: 800 }) // Adjust dimensions as needed
    .webp()
    .toBuffer();
    // console.log(file);
    const { originalname } = file;
    const bucket = admin.storage().bucket();
    const fileName = `${Date.now()}-${originalname}.webp`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: 'image/webp',
      },
    });

    stream.end(compressedImageBuffer);
    // const downloadUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    const [downloadUrl] = await fileUpload.getSignedUrl({
      action: 'read',
      // Set expires to a very distant future timestamp
      expires: '9999-12-31T23:59:59Z',
    });

    const newFile = new File({
      name: fileName,
      originalName: originalname,
      mimetype: 'image/webp',
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

router.post('/download', async (req, res) => {
  try {
    const {fileId} = req.body;
    const Img = await File.findOne({ _id : fileId })
    res.status(200).json(Img.url)
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
});

// router.post('/delete', async (req, res) => {
//   try {
//     const { fileId } = req.body;
//     if (!mongoose.Types.ObjectId.isValid(fileId)) throw new Error('Invalid File ID');

//     const result = await File.findByIdAndDelete(fileId);
//     if (!result) throw new Error("Couldn't find the file");

//     gcs.bucket(config.GCS_BUCKET).file(`images/${result.name}`).delete();

//     res.sendStatus(204);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ error: err.toString() });
//   }
// });

export default router