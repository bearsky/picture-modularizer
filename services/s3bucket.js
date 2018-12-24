const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');

module.exports = (config) => {
  const { region, bucketName } = config.aws;
  aws.config.region = region;
  const s3 = new aws.S3();

  return {
    uploadFiles(folder, type) {
      const files = fs.readdirSync(folder);
      files.forEach(file => {
        const params = {
          Bucket: `${bucketName}/modularizer`,
          ContentType: type,
          Key: `${path.basename(folder)}/${file}`,
          Body: fs.createReadStream(`${folder}/${file}`),
        };
        const uploadPromise = s3.upload(params).promise();
        uploadPromise
          .then((data) => console.log('Success'))
          .catch((err) => console.error(err));
      });
    },
  }
}