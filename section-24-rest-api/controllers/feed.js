exports.getFeed = (req, res) => {
  res.status(200).json({
    message: "Feed retrieved successfully",
    feeds: [{ id: 1, title: "First Feed", content: "This is the first feed" }],
  });
};

exports.createFeed = (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  res.status(201).json({
    message: "Feed created successfully",
    feed: { id: 2, title: title, content: content },
  });
};
