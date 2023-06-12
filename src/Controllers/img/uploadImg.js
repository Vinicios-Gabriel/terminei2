const { uploadFile } = require('../../Uploads/storage');

async function uploadImg(req, res) {
  const { file } = req;
  try {
    const img = await uploadFile(`imagens/${file.originalname}`, file.buffer, file.mimetype);

    return res.status(200).json(img);
  } catch (error) {
    return res.status(404).json(error.message);
  }
}

module.exports = uploadImg;
