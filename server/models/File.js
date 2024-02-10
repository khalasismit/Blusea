// file upload 
import mongoose from "mongoose";
const FileSchema = new mongoose.Schema({
    fileName:{
        type:String
    },
    originalName: {
        type:String
    },
    mimetype:{
        type:String
    },
    url: {
       type: String
    },
    uploadDate: { type: Date, default: Date.now },
});
const File = mongoose.model("File", FileSchema);
export default File;