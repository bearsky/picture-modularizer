# picture-modularizer
Node application for uploading images and breaking them into modular pictures

##How it works:
* [Express-handlebars](https://github.com/ericf/express-handlebars) template to contain upload form which sends AJAX request to /upload endpoint;
* the request is handled by [multer](https://github.com/expressjs/multer) to fetch binary image file;
* locally stored uploaded image files and sliced output files;
* *// TODO: implement [Heroku](https://www.heroku.com) hosting and [AWS-s3](https://aws.amazon.com/s3/) to store uploaded files and sliced parts;*
* [mLab](https://mlab.com/) hosted mongodb with Images collection (local db for dev)
* document structure example:
    
```bash
{
    "_id": ObjectId("5c1a51908d69f63164cdd2c3"),
    "parts": [
        "part-0-1545228687000-Screenshot from 2018-09-09 23-35-56.png",
        "part-1-1545228687000-Screenshot from 2018-09-09 23-35-56.png",
        "part-2-1545228687000-Screenshot from 2018-09-09 23-35-56.png",
        "part-3-1545228687000-Screenshot from 2018-09-09 23-35-56.png",
        "part-4-1545228687000-Screenshot from 2018-09-09 23-35-56.png",
        "part-5-1545228687000-Screenshot from 2018-09-09 23-35-56.png"
    ],
    "filename": "1545228687000-Screenshot from 2018-09-09 23-35-56.png",
    "sliceOrientation": "vertical",
    "__v": 0
}
```
    
* [imagemagick](https://github.com/rsms/node-imagemagick) module to handle uploaded images *(get dimensions, slice image into even pieces vertically or horizontally, according to incoming request params, i.e - example above was cropped into 3 vertical parts)*

* *// TODO: output sliced image parts on the same home page, below upload form;*

##How to run (prod):
```bash
yarn install
node index.js
```

##How to run (dev):
```bash
yarn install
yarn dev
```