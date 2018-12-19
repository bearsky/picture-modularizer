const im = require('imagemagick');
const fs = require('fs');
const Promise = require('bluebird');

module.exports = () => {
  function identifyAsync(param) {
    return new Promise((resolve, reject) => {
      im.identify(param, (err, features) => {
        if (err !== null) reject(err);
        else resolve(features);
      });
    });
  };
  function prepareCropQuery(features, path, destination, filename) {
     return [
      path,
      '-crop',
      `${features.partWidth}x${features.partHeight}`,
      `${destination}/part-%d-${filename}`
    ];
  };

  return {
    partsOutline(img, orientation, parts){
      let x, y;
      if (orientation === 'vertical') {
        x = 1/parts;
        y = 1;
      } else {
        x = 1;
        y = 1/parts;
      }
      return identifyAsync(img)
        .then((features) => {
          return {
            partWidth: Math.ceil(features.width * x),
            partHeight: Math.ceil(features.height * y),
          }
        })
        .catch(err => console.log(err));
    },
    convertAsync(features, path, destination, filename) {
      const options = prepareCropQuery(features, path, destination, filename);
      return new Promise((resolve, reject) => {
        im.convert(options, (err, metadata) => {
          if (err !== null) reject(err);
          else resolve('metadata');
        });
      });
    },
    prepareParts(folder, arr) {
      const files = fs.readdirSync(folder);
      files.forEach(file => {
        if(file.indexOf('part-', 0) === 0) {
          arr.push(file);
        }
      });
    },

  }
}