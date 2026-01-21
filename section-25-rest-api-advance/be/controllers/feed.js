const { validationResult } = require("express-validator");

exports.getPosts = (req, res) => {
  res.status(200).json({
    message: "Posts retrieved successfully",
    posts: [
      {
        id: 1,
        title: "First Post",
        content: "This is the first post",
        imageUrl: "images/duck.jpg",
        creator: { id: 1, name: "John Doe" },
        createAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  const title = req.body.title;
  const content = req.body.content;
  res.status(201).json({
    message: "Post created successfully",
    post: {
      id: 2,
      title: title,
      content: content,
      imageUrl: "images/duck.jpg",
      creator: { id: 1, name: "John Doe" },
      createAt: new Date(),
    },
  });
};
