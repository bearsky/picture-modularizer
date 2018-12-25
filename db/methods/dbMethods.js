const mongoose = require('mongoose');
const Image = require('../models/images');

module.exports = (config) => {
  return {
    connectDB() {
      mongoose.connect(config.db.mongoURI, { useNewUrlParser: true });
    },
    createImage(obj) {
      const image = new Image({
        _id: new mongoose.Types.ObjectId(),
        filename: obj.filename,
        fileLink: `${obj.publicPath}/${obj.filename}`,
        sliceOrientation: obj.orientation,
        parts: obj.partsArr,
      });
      image.save()
      .then(result => console.log(result))
      .catch(err => console.log(err));
    },
    getImages() {
      return Image.find({})
        .then(images => {return images;})
        .catch(err => console.error(err));
    }
  }
}