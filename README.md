# picture-modularizer
Node application for uploading images and breaking them into modular pictures

## How it works:
* [Express-handlebars](https://github.com/ericf/express-handlebars) template to contain upload form which sends AJAX request to /upload endpoint;
* the request is handled by [multer](https://github.com/expressjs/multer) to fetch binary image file;
* locally stored uploaded image files and sliced output files;
* *// TODO: implement [Heroku](https://www.heroku.com) hosting and [AWS-s3](https://aws.amazon.com/s3/) to store uploaded files and sliced parts;*
* [mLab](https://mlab.com/) hosted mongodb with Images collection (local db for dev)
* document structure example:

```bash
{
    "_id" : ObjectId("5c1a7d7de2721a5b5f083db2"),
    "parts" : [
        "part-0-2018-12-19T17:18:52-bg.jpg",
        "part-1-2018-12-19T17:18:52-bg.jpg",
        "part-2-2018-12-19T17:18:52-bg.jpg"
    ],
    "filename" : "2018-12-19T17:18:52-bg.jpg",
    "sliceOrientation" : "vertical",
    "__v" : 0
}
```

* [imagemagick](https://github.com/rsms/node-imagemagick) module to handle uploaded images *(get dimensions, slice image into even pieces vertically or horizontally, according to incoming request params, i.e - example above was cropped into 3 vertical parts)*

* Sliced image parts are shown on the same home page, below upload form;
* *// TODO: output uploaded images list and show their metadata*
* *// TODO: UI improvements, i.e. - 'remove' btn for chosen image (pre-upload preview state)*
* *// TODO: logger for results and errors, instead of console.logs*

## How to run (prod):
```bash
yarn install
node index.js
```

## How to run (dev):
```bash
yarn install
yarn dev
```