const JoinNow = require("../../models/JoinNow/join_now");
const { joinNowValidationSchema } = require("../../Validation/join_now");

// ADD
exports.createJoinNow = async (req, res) => {
  try {
    const { error } = joinNowValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const data = await JoinNow.create(req.body);
    res.status(200).json({ message: "Form submitted", data });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET ALL
exports.getJoinNowList = async (req, res) => {
  try {

        const { page = 1, limit = 10 ,search = ""} = req.query;
    
        const skip = (parseInt(page) - 1) * parseInt(limit);
    
        // Fetch total count for pagination
        const total = await JoinNow.countDocuments();

    const list = await JoinNow.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

       res.status(200)
      .send({
        message: "Contact us data found successfully",
        data: list,
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
exports.deleteJoinNow = async (req, res) => {
  try {
    const { id } = req.params;
    await JoinNow.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
