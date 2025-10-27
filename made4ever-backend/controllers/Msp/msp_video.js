
const MspVideo = require("../../models/Msp/msp_video");
const mspVideoValidationSchema = require("../../Validation/msp_video");

exports.add_msp_video = async (req, res) => {
  try {
    // ✅ Validate request body
    const { error, value } = mspVideoValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }
    const {
      msp_video,
    } = req.body;

  

    const new_msp_video = new MspVideo({
     msp_video
    });

    // Save the deal to the database
    const resp = await new_msp_video.save();
    res
      .status(200)
      .send({ message: "Msp Video added successfully", msp: resp });
  } catch (error) {
    console.error("Error adding msp video:", error);
    res.status(500).send({
      message: "Error occurred while adding msp video",
      error: error.message,
    });
  }
};

exports.get_msp_video = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch total count for pagination
    const total = await MspVideo.countDocuments();

    const exitingmspvideo = await MspVideo
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res
      .status(200)
      .send({
        message: "Msp Video found successfully",
        mspVideo: exitingmspvideo,
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      });
  } catch (error) {
    console.error("Error getting msp video:", error);
    res.status(500).send({
      message: "Error occurred while getting msp video",
      error: error.message,
    });
  }
};
