const express = require("express");
const Product = require("../models/product");
const router = express.Router();

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
router.post("", (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    content: req.body.content,
  });
  product.save().then((createdPost) => {
    res.status(201).json({
      message: "product added successfully",
      productId: product._id,
    });
  });
});

//delete product by id
router.delete("/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "selected product deleted!" });
  });
});

//get selected product
router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id).then((product) => {
    res.status(201).json({
      message: "get selected product successfully",
      product: product,
    });
  });
});

// router.put("/:id", (req, res, next) => {
//   // prodInd = mockProducts.indexOf(
//   //   mockProducts.find((prod) => prod.id == req.params.id)
//   // );

//   const product = new Product({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content
//   });
//   console.log(product)
//   Product.updateOne({ _id: req.params.id }, product).then((res) => {
//     res.status(200).json({ message: "product update successful!" });
//   });
// });



router.put("/:id", (req, res, next) => {
  const product = new Product({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });

  Product.updateOne({ _id: req.params.id }, product).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});
module.exports = router;
