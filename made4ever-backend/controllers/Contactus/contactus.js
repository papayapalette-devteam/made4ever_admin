const contactus = require("../../models/ContactUs/contact_us");
const { contactusValidationSchema } = require("../../Validation/contactus");

// ADD
exports.createContactus = async (req, res) => {
  try {
    const { error } = contactusValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const data = await contactus.create(req.body);
    res.status(200).json({ message: "Form submitted", data });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET ALL
exports.getContactusList = async (req, res) => {
  try {

        const { page = 1, limit = 10 ,search = ""} = req.query;
    
        const skip = (parseInt(page) - 1) * parseInt(limit);
    
        // Fetch total count for pagination
        const total = await contactus.countDocuments();

    const list = await contactus.find()
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
exports.deleteContactus = async (req, res) => {
  try {
    const { id } = req.params;
    await contactus.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
