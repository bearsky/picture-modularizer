require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const nodePath = require('path');
const config = require('./config');
const { multerUpload, s3bucket } = require ('./services')(config);
const { dbMethods } = require('./db/methods')(config);
const { imageHandler } = require('./helpers');
const { partsOutline, prepareCropQuery, convertAsync, prepareParts } = imageHandler;
const { port } = config;

const app = express();
dbMethods.connectDB();

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', '.hbs');
app.use(express.static('./public'));
app.use('/uploads', express.static('.public/uploads'));

app.get('/', (req, res) => res.render('home'));

app.post('/upload',
  multerUpload.single('imgFile'),
  (req, res) => {
    const { destination, filename, path, mimetype } = req.file;
    const { orientation, parts } = req.body;
    const imageData = {
      filename,
      orientation,
      localPath: nodePath.parse(filename).name,
      publicPath: `${config.aws.assetsPath}/${nodePath.parse(filename).name}`,
      partsArr: [],
    };

    partsOutline(path, orientation, parts)
      .then(result => {
        return convertAsync(result, path, destination, filename)
      })
      .then(() => {
        prepareParts(destination, imageData.partsArr)
      })
      .then(() => s3bucket.uploadFiles(destination, mimetype))
      .then(() => dbMethods.createImage(imageData))
      .then(() => res.status(200).send(imageData))
      .catch(err => console.log(err));
  }
);

app.get('/list',
  (req, res) => {
    dbMethods.getImages()
      .then(images => {
        res.render('list', { images });
      })
      .catch(err => console.error(err));
  }
);

// handle 404
app.use((req, res) =>{
  res.status(404);
  res.render('error');
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});