const express = require("express");
const { addBlog, getAllBlogs, deleteBlog } = require("../controllers/Blog/blog");


const router = express.Router();

router.post("/add-blog", addBlog);

router.get("/all-blogs", getAllBlogs);

router.delete("/delete-blog", deleteBlog);




module.exports = router;
