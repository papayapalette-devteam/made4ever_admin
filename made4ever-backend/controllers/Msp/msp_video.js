
const MspVideo = require("../../models/Msp/msp_video");
const mspVideoValidationSchema = require("../../Validation/msp_video");

exports.add_msp_video = async (req, res) => {
  try {
    const { id, ...rest } = req.body; // separate id

    // Validate only actual schema fields
    const { error } = mspVideoValidationSchema.validate(rest);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }

    // UPDATE
    if (id) {
      const updatedVideo = await MspVideo.findByIdAndUpdate(
        id,
        rest,
        { new: true }
      );

      if (!updatedVideo) {
        return res.status(404).json({
          status: "error",
          message: "MSP Video not found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "MSP Video updated successfully",
        msp: updatedVideo,
      });
    }

    // ADD
    const new_msp_video = new MspVideo(rest);
    const resp = await new_msp_video.save();

    res.status(200).json({
      status: "success",
      message: "MSP Video added successfully",
      msp: resp,
    });

  } catch (error) {
    console.error("Error in add/update MSP video:", error);
    res.status(500).json({
      message: "Error occurred while processing MSP video",
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


exports.delete_msp_video = async (req, res) => {
  try {
    const { id } = req.params;
    await MspVideo.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};