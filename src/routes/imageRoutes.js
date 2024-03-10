const express = require('express');
const {
  uploadImage,
  getImages, deleteImages
} = require('../controllers/imageController.js');
const upload = require('../middleware/multer.js');
const router = express.Router();

router.route('/list-images').get(getImages);
router.route('/delete').delete(deleteImages);
router.route('/upload').post(upload.single('file'), uploadImage);

module.exports = router;
