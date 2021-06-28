const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// where and how to store file
const multer = require("multer");
const { forEachLeadingCommentRange } = require("typescript");

// const MIME_TYPE_MAP = {
//   'image/png' :'png',
//   'image/jpeg' :'jpg',
//   'image/jpg' :'jpg'
// }

// // define where multer put files from request. diskstorage confige how multer store things

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  // will be executes whenever multer tries to save a file
  destination: (req, file, cb) => {
    // let error = MIME_TYPE_MAP[file.mimetype] || new Error("invalid mime type");
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

//get all products
router.get("", (req, res, next) => {
  Product.find().then((documents) => {
    res.status(200).json({
      message: "product fetched successfully!",
      products: documents,
    });
  });
});

//add new product
router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    console.log(req.file)
    if (!req.body._id) {
      const url = req.protocol + "://" + req.get("host");
      const imagePath = url + "/images/" + req.file.filename

      addProduct(req.body, res, imagePath);
    } else {
      editProduct(req.body, res);
    }
  }
);

//delete product by id
router.delete("/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: "selected product deleted!" });
    })
    .catch((err) => console.error(err));
});

//get selected product
router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id).then((product) => {
    res
      .status(201)
      .json({
        message: "get selected product successfully",
        product: product,
      })
      .catch((err) => console.error(err));
  });
});

async function editProduct(productData, res) {
  const product = new Product({
    _id: productData.id,
    title: productData.title,
    content: productData.content,
  });

  Product.updateOne({ _id: productData.id }, product)
    .then((result) => {
      res.status(200).json({ message: "Update successful!" });
    })
    .catch((err) => console.error(err));
}

async function addProduct(productData, res, imagePath) {
  try {
    console.log(imagePath);

    const product = new Product({
      title: productData.title,
      content: productData.content,
      imagePath: imagePath
    });

    const results = await product.save();
    res.status(201).json(results);
  } catch (exc) {
    console.error("message", exc.message);
  }
}
module.exports = router;

//edit product
// router.put("/:id", (req, res, next) => {
//   const product = new Product({
//     _id: req.params.id,
//     title: req.body.title,
//     content: req.body.content,
//   });

//   Product.updateOne({ _id: req.params.id }, product)
//     .then((result) => {
//       res.status(200).json({ message: "Update successful!" });
//     })
//     .catch((err) => console.error(err));
// });
