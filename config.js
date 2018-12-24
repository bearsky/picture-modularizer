const isDEV = process.env.NODE_ENV === 'development';

module.exports = {
  port: isDEV ? 8000 : process.env.PORT,
  db: {
    mongoURI: isDEV ? 'mongodb://127.0.0.1:27017/myDb' : process.env.MONGO_URI
  },
  aws: {
    bucketName: process.env.S3_BUCKET_NAME,
    region: 'us-east-1',
    assetsPath: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/modularizer`,
  }
}