
const MspGallary = require("../../models/Msp/msp_gallary");
const mspGallaryValidationSchema = require("../../Validation/msp_gallary");

exports.add_msp_gallary = async (req, res) => {
  try {
    // ✅ Validate request body
    const { error, value } = mspGallaryValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }
    const {
      msp_gallary,
    } = req.body;

  

    const new_msp_gallary = new MspGallary({
     msp_gallary
    });

    // Save the deal to the database
    const resp = await new_msp_gallary.save();
    res
      .status(200)
      .send({ message: "Msp Gallary added successfully", msp: resp });
  } catch (error) {
    console.error("Error adding msp gallary:", error);
    res.status(500).send({
      message: "Error occurred while adding msp gallary",
      error: error.message,
    });
  }
};

exports.get_msp_gallary = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch total count for pagination
    const total = await MspGallary.countDocuments();

    const exitingmspgallary = await MspGallary
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res
      .status(200)
      .send({
        message: "Msp Gallary found successfully",
        mspGallary: exitingmspgallary,
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      });
  } catch (error) {
    console.error("Error getting msp gallary:", error);
    res.status(500).send({
      message: "Error occurred while getting msp gallary",
      error: error.message,
    });
  }
};
