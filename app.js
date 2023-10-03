const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const DB_URL = "mongodb://127.0.0.1/blogapi";
const Blog = require("./model/blog");

const blogRoutes = require("./router/blogRoutes");

mongoose
  .connect(DB_URL)
  .then(
    app.listen(3000, (req, res) => {
      console.log("Connected to database...");
    })
  )
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/blogs", blogRoutes);
