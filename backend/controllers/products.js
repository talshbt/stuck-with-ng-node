const express = require("express");

// const Post = require("../models/post");

const router = express.Router();
var id = 0;
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
  { title: "tal", content: "flight", id: null },
  { title: "eran", content: "flight", id: null },
];

router.get("", (req, res, next) => {
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: mockProducts,
  });
});

router.post("", (req, res, next) => {
  // const post = new Post({
  //   title: req.body.title,
  //   content: req.body.content
  // });
  // post.save().then(createdPost => {
    console.log(req.body)
    product = req.body;
    product['productId'] = id++;
    mockProducts.push(product)
    // console.log(product)
    res.status(201).json({
      message: "Post added successfully",
      productId: id++
    });
  });
// });


module.exports = router;
