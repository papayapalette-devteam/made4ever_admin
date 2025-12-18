const Blog = require("../../models/Blog/blog"); // adjust path if needed
const blogValidationSchema = require("../../Validation/blog");

const addBlog = async (req, res) => {
  try {
    // 🔍 Joi Validation
    const { error, value } = blogValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map(err => err.message),
      });
    }

    const { title, content, image } = req.body;

    // 📝 Create Blog
    const blog = new Blog({
      title,
      content,
      image,
    });

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog added successfully",
      data: blog,
    });

  } catch (err) {
    console.error("Add Blog Error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const total = await Blog.countDocuments();

    const blogs = await Blog
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    return res.status(200).json({
      success: true,
      data: blogs,
       page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
    });

  } catch (err) {
    console.error("Get Blogs Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const deleteBlog = async (req, res) => {
  try {
    const { id } = req.query;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (err) {
    console.error("Delete Blog Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




module.exports = { addBlog,getAllBlogs,deleteBlog };
