import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("uploads"));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = Date.now() + ext;
        cb(null, name);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images allowed"), false);
    }
};

export const upload = multer({ storage, fileFilter });
