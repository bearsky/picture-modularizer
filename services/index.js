module.exports = (config) => {
  return {
    multerUpload: require('./multer'),
    s3bucket: require('./s3bucket')(config),
  }
}