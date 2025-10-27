
const MspEventImage = require("../../models/Msp/msp_event_image");
const mspEventImageValidationSchema = require("../../Validation/msp_event_image");

exports.add_msp_event_image = async (req, res) => {
  try {
    // ✅ Validate request body
    const { error, value } = mspEventImageValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }
    const {
      msp_event_image,
    } = req.body;

  

    const new_msp_event_image = new MspEventImage({
     msp_event_image
    });

    // Save the deal to the database
    const resp = await new_msp_event_image.save();
    res
      .status(200)
      .send({ message: "Msp Event Images added successfully", msp: resp });
  } catch (error) {
    console.error("Error adding msp event images:", error);
    res.status(500).send({
      message: "Error occurred while adding msp event images",
      error: error.message,
    });
  }
};

exports.get_msp_event_image = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch total count for pagination
    const total = await MspEventImage.countDocuments();

    const exitingmsp = await MspEventImage
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res
      .status(200)
      .send({
        message: "Msp Event Image found successfully",
        mspEventImage: exitingmsp,
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      });
  } catch (error) {
    console.error("Error getting msp event image:", error);
    res.status(500).send({
      message: "Error occurred while getting msp event image",
      error: error.message,
    });
  }
};
