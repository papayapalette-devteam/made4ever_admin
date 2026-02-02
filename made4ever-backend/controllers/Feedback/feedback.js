const Feedback = require("../../models/Feedback/feedback");
const { feedbackValidationSchema } = require("../../Validation/feedback");

const createFeedback = async (req, res) => {
  try {
    // ✅ Joi validation
    const { error, value } = feedbackValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { bureau, feedback,image,audio } = value;

    // ✅ Save to DB
    const newFeedback = await Feedback.create({
      bureau,
      feedback,
      image,
      audio
    });

    return res.status(200).json({
      success: true,
      message: "Feedback submitted successfully",
      data: newFeedback,
    });
  } catch (err) {
    console.error("Feedback Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET ALL FEEDBACKS
const getAllFeedbacks = async (req, res) => {
  try {
    const { page = 1, limit = 10 ,search = ""} = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const total = await Feedback.countDocuments();
    
    const feedbacks = await Feedback.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate("bureau")


    res.status(200).json({
      success: true,
      data: feedbacks,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// UPDATE FEEDBACK
const updateFeedback = async (req, res) => {
  try {
    const { error, value } = feedbackValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
       
        const id=req.params.id

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      value,
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback updated successfully",
      data: feedback,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// DELETE FEEDBACK
const deleteFeedback = async (req, res) => {
  try {

    const id=req.params.id

    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createFeedback,
  getAllFeedbacks,
  updateFeedback,
  deleteFeedback,
};
