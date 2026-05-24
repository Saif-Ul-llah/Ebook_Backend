import multer from "multer";

export const manuscriptUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = new Set([
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]);

    if (!allowedTypes.has(file.mimetype)) {
      cb(new Error("Only PDF, DOC, DOCX, and TXT manuscript files are allowed"));
      return;
    }

    cb(null, true);
  },
});
