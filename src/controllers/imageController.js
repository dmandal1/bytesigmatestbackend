const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async.js');
const storage = require('../utils/firebaseService.js');
const Image = require('../models/Image.js');
const uuid = require('uuid-v4');

// @desc    Upload imaage
// @route   POST /api/v1/images/upload
exports.uploadImage = async (req, res, next) => {
  try{
  const file = req.file;
  if (!file) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  const filePath = req.file.path;
  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuid(),
    },

    contentType: file.mimetype,
    cacheControl: 'public, max-age=31536000',
  };
  const response = await storage.upload(filePath, {
    gzip: true,
    metadata: metadata,
    public: true,
  });

  const newImage = new Image({
    fileName: req.file.originalname,
    filter: req.body.filter,
    imageUrl: encodeURI(`https://storage.googleapis.com/${storage.name}/${file.originalname}`), 
  });
  await newImage.save();

  res.status(200).json({
    message: 'Image uploaded successfully.',
  });
} catch(err) {
  console.error('Error uploading image:', err);
    res.status(500).json({ message: 'Error uploading image. Internal Server Error.' });
}
};

// @desc    Get All images
// @route   GET /api/v1/images/getAll
exports.getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({
      success: true,
      count: images.length,
      data: images
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
};