import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "profile_pics",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
    },
});

export const upload = multer({ storage });
