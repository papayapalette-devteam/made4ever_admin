
const MspGallary = require("../../models/Msp/msp_gallary");
const mspGallaryValidationSchema = require("../../Validation/msp_gallary");

exports.add_msp_gallary = async (req, res) => {
  try {
    const { id, ...rest } = req.body;

    // ✅ Validate only gallery field (exclude id)
    const { error } = mspGallaryValidationSchema.validate(rest);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }

    // ✅ UPDATE
    if (id) {
      const updatedGallary = await MspGallary.findByIdAndUpdate(
        id,
        { msp_gallary: rest.msp_gallary },
        { new: true }
      );

      if (!updatedGallary) {
        return res.status(404).json({
          status: "error",
          message: "MSP Gallary not found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "MSP Gallary updated successfully",
        msp: updatedGallary,
      });
    }

    // ✅ ADD
    const new_msp_gallary = new MspGallary({
      msp_gallary: rest.msp_gallary,
    });

    const resp = await new_msp_gallary.save();

    res.status(200).json({
      status: "success",
      message: "MSP Gallary added successfully",
      msp: resp,
    });

  } catch (error) {
    console.error("Error in add/update MSP gallary:", error);
    res.status(500).json({
      message: "Error occurred while processing MSP gallary",
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


exports.delete_msp_image = async (req, res) => {
  try {
    const { id } = req.params;
    await MspGallary.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};