const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const AWS = require('../../utils/aws');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    const ext = path.extname(file.originalname);
    const fileCheck = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(ext);
    if (!fileCheck) {
      return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 10000000, // Upload limit -> 10MB
  },
}).single('file');

// TODO Add secure API
router.post('/', async (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }
    AWS.sendFiletoAws(req.file)
      .then((d) => {
        const data = { url: `https://askbhunte.s3.amazonaws.com/${d.fileData.Key}` };
        res.json(data);
      })
      .catch((e) => next(e));
  });
});

module.exports = router;
