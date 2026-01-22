const express = require("express");
const { addBlog, getAllBlogs, deleteBlog, getBlogById } = require("../controllers/Blog/blog");


const router = express.Router();

router.post("/add-blog", addBlog);

router.get("/all-blogs", getAllBlogs);

router.get("/blog-by-id/:id", getBlogById);

router.delete("/delete-blog/:id", deleteBlog);




module.exports = router;
