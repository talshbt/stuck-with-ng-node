const express = require("express");

// const Post = require("../models/post");

const router = express.Router();
var id = 2;
// router.post("", (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content
//   });
//   post.save().then(createdPost => {
//     res.status(201).json({
//       message: "Post added successfully",
//       postId: createdPost._id
//     });
//   });
// });

// router.put("/:id", (req, res, next) => {
//   const post = new Post({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content
//   });
//   Post.updateOne({ _id: req.params.id }, post).then(result => {
//     res.status(200).json({ message: "Update successful!" });
//   });
// });

// router.get("/:id", (req, res, next) => {
//   Post.findById(req.params.id).then(post => {
//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).json({ message: "Post not found!" });
//     }
//   });
// });

// router.delete("/:id", (req, res, next) => {
//   Post.deleteOne({ _id: req.params.id }).then(result => {
//     console.log(result);
//     res.status(200).json({ message: "Post deleted!" });
//   });
// });
var mockProducts = [
  { title: "tal", content: "flight", id: 0 },
  { title: "eran", content: "flight", id: 1 },
];

router.get("", (req, res, next) => {
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: mockProducts,
  });
});

router.post("", (req, res, next) => {
  console.log(req.body);
  product = req.body;
  product["productId"] = id++;
  mockProducts.push(product);
  res.status(201).json({
    message: "Post added successfully",
    productId: id++,
  });
});

router.delete("/:id", (req, res, next) => {
    prodInd = mockProducts.indexOf(mockProducts.filter(prod=>prod.id !== req.params.id));
    mockProducts.splice(prodInd, 1)
    res.status(200).json({ message: "Post deleted!" });
});

router.get("/:id", (req, res, next) => {
  product = mockProducts.find(prod=>prod.id == req.params.id);
  res.status(201).json({
    message: "Post successfully",
    product: product,
  });
});
router.put("/:id", (req, res, next) => {
  // mockProducts.forEach(x=>{
  //   console.log(x.id===req.body.id )
  // })
     prodInd = mockProducts.indexOf(mockProducts.find(prod=>prod.id == req.params.id));
     console.log(prodInd)
       mockProducts[prodInd] = req.body
      // console.log(mockProducts)
    res.status(200).json({ message: "Update successful!" });
  // });
});

module.exports = router;
