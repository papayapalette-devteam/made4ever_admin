const bcrypt = require("bcrypt");
const msp_data = require("../../models/Msp/msp");
const mspValidationSchema = require("../../Validation/msp_data");

exports.add_msp = async (req, res) => {
  try {
    // ✅ Validate request body
    const { error, value } = mspValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }
    const {
      name,
      email,
      password,
      mobile_number,
      registered_business_name,
      address,
      id,
    } = req.body;

    const exitingprofile = await msp_data.findOne({ email: email });
    if (exitingprofile) {
      res.status(400).send({ message: "This Email id already exist..." });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const new_msp_data = new msp_data({
      name,
      email,
      password: hashedPassword,
      mobile_number,
      registered_business_name,
      address,
      id,
    });

    // Save the deal to the database
    const resp = await new_msp_data.save();
    res
      .status(200)
      .send({ message: "Msp Profile added successfully", msp: resp });
  } catch (error) {
    console.error("Error adding msp profile:", error);
    res.status(500).send({
      message: "Error occurred while adding msp profile",
      error: error.message,
    });
  }
};

exports.get_msp = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch total count for pagination
    const total = await msp_data.countDocuments();

    const exitingmsp = await msp_data
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res
      .status(200)
      .send({
        message: "Msp Profile found successfully",
        msp: exitingmsp,
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      });
  } catch (error) {
    console.error("Error getting msp profile:", error);
    res.status(500).send({
      message: "Error occurred while getting msp profile",
      error: error.message,
    });
  }
};


exports.update_msp = async (req, res) => {
  try {
    // const { error } = updateMspSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).json({ message: error.details[0].message });
    // }

    const mspId = req.params._id;

    const {
      name,
      email,
      password,
      mobile_number,
      registered_business_name,
      address,
      id,
    } = req.body;

    // email conflict check
    const emailExists = await msp_data.findOne({
      email,
      _id: { $ne: mspId },
    });

    if (emailExists) {
      return res.status(400).json({
        message: "This Email id already exists...",
      });
    }

    const updateData = {
      name,
      email,
      mobile_number,
      registered_business_name,
      address,
      id,
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updated = await msp_data.findByIdAndUpdate(
      mspId,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "MSP not found" });
    }

    res.status(200).json({
      message: "MSP profile updated successfully",
      msp: updated,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.updateMspCredit = async (req, res) => {
  try {
    const mspId = req.params;
    
    const { credit } = req.body;

    if (!mspId) {
      return res.status(400).json({ message: "MSP ID is required" });
    }

    if (credit === undefined) {
      return res.status(400).json({ message: "Credit is required" });
    }

    if (credit % 5 !== 0) {
      return res
        .status(400)
        .json({ message: "Credit must be in multiples of 5" });
    }

    if (credit < 0) {
      return res
        .status(400)
        .json({ message: "Credit cannot be negative" });
    }

    const msp = await msp_data.findByIdAndUpdate(
      mspId,
      { credits:credit },
      { new: true }
    );

    if (!msp) {
      return res.status(404).json({ message: "MSP not found" });
    }

    res.status(200).json({
      message: "MSP credit updated successfully",
      data: {
        _id: msp._id,
        credits: msp.credit,
      },
    });
  } catch (error) {
    console.error("Update MSP Credit Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
