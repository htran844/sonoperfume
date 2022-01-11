const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

module.exports.upImages = async (imagePath, imageName) => {
  let url = "";
  await cloudinary.uploader.upload(
    imagePath,
    { public_id: imageName },
    function (error, result) {
      if (result) {
        url = result.url;
      }
    }
  );
  return url;
};
