const isDEV = process.env.NODE_ENV === 'development';

module.exports = {
  port: isDEV ? 8000 : process.env.PORT,
  db: {
    mongoURI: isDEV ? 'mongodb://127.0.0.1:27017/myDb' : process.env.MONGO_URI
  },
}