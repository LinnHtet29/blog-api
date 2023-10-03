const Blog = require("../model/blog");

const blog_show = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      return res.status(200).json({
        status: true,
        blogs: result,
      });
    });
};

const blog_post = (req, res) => {
  console.log(req.body);
  let reqData = req.body;
  if (reqData.title === "" || reqData.content === "" || reqData.author === "") {
    console.log("It work");
    return res.status(400).json({
      status: false,
      error: "Validation failed",
    });
  }
  let blog = new Blog(reqData);
  blog
    .save()
    .then(() =>
      res.status(200).json({
        status: true,
        result: {
          msg: "Blog added successful...",
          blog: blog,
        },
      })
    )
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        status: false,
        error: "Failed to add the blog.",
      });
    });
};

const blog_update = (req, res) => {
  console.log(req.body);
  let id = req.params.id;
  let reqData = req.body;
  if (reqData.title === "" || reqData.content === "" || reqData.author === "") {
    console.log("It work");
    return res.status(400).json({
      status: false,
      error: "Validation failed",
    });
  }
  Blog.findByIdAndUpdate(id, reqData, { new: true })
    .then(() =>
      res.status(200).json({
        status: true,
        result: {
          msg: "Blog added successful...",
          blog: reqData,
        },
      })
    )
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        status: false,
        error: "Failed to add the blog.",
      });
    });
};

const blog_single = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Blog.findById(id);
    return res.status(200).json({
      result: {
        msg: "Fetch successful",
        blog: result,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      error: "Failed to fetch the blog by ID.",
    });
  }
};

const blog_remove = (req, res) => {
  let id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({
        result: {
          msg: "Delete blog successful",
          blog: result,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        result: {
          status: false,
          error: "Failed to delete.",
        },
      });
    });
};

module.exports = {
  blog_post,
  blog_show,
  blog_single,
  blog_remove,
  blog_update,
};
