const express = require("express");
const Product = require("../models/product");

const router = express.Router();

// var mockProducts = [
//   { title: "tal", content: "flight", id: 0 },
//   { title: "eran", content: "flight", id: 1 },
// ];

//get all products
router.get("", (req, res, next) => {
  Product.find().then((documents) => {
    console.log(documents)
    res.status(200).json({
      message: "Posts fetched successfully!",
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
      message: "Post added successfully",
      productId: product._id,
    });
  });
});

router.delete("/:id", (req, res, next) => {
  prodInd = mockProducts.indexOf(
    mockProducts.filter((prod) => prod.id !== req.params.id)
  );
  mockProducts.splice(prodInd, 1);
  res.status(200).json({ message: "Post deleted!" });
});

router.get("/:id", (req, res, next) => {
  product = mockProducts.find((prod) => prod.id == req.params.id);
  res.status(201).json({
    message: "Post successfully",
    product: product,
  });
});
router.put("/:id", (req, res, next) => {
  prodInd = mockProducts.indexOf(
    mockProducts.find((prod) => prod.id == req.params.id)
  );
  console.log(prodInd);
  mockProducts[prodInd] = req.body;
  res.status(200).json({ message: "Update successful!" });
});

module.exports = router;
