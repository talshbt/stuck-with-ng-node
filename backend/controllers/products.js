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

  console.log(req.body.id)
  if (!req.body.id) {
    console.log("add new product");
    addProduct(req.body, res);
  } else {
    console.log("edit product");
    editProduct(req.body, res);
  }

  // addProduct(req.body, res);
  // const product = new Product({
  //   title: req.body.title,
  //   content: req.body.content,
  // });
  // product.save().then((createdPost) => {
  //   res.status(201).json({
  //     message: "product added successfully",
  //     productId: product._id,
  //   });
  // });
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

//edit product
router.put("/:id", (req, res, next) => {
  const product = new Product({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  });

  Product.updateOne({ _id: req.params.id }, product).then((result) => {
    res.status(200).json({ message: "Update successful!" });
  });
});

async function editProduct(productData, res) {
  console.log('EDITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT')
  const product = new Product({
    _id: productData.id,
    title: productData.title,
    content: productData.content,
  });

  Product.updateOne({ _id: productData.id }, product).then((result) => {
    res.status(200).json({ message: "Update successful!" });
  });
}

async function addProduct(productData, res) {
  try {
    const product = new Product({
      title: productData.title,
      content: productData.content,
      // image: productData.image
    });

    const results = await product.save();
    res.status(201).json(results);
  } catch (exc) {
    console.error(exc.message);
  }
}
module.exports = router;
