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
      images,
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
      images,
    });

  
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
    const { page = 1, limit = 10 ,search = ""} = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch total count for pagination
    const total = await msp_data.countDocuments();

     // 🔍 Search filter
const filter = search
  ? {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { registered_business_name: { $regex: search, $options: "i" } },

        // 🔥 Partial mobile number search
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$mobile_number" },
              regex: search,
            },
          },
        },
      ],
    }
  : {};



    const exitingmsp = await msp_data
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200)
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


    const mspId = req.params._id;

    const {
      name,
      email,
      password,
      mobile_number,
      registered_business_name,
      address,
      images,
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
      password,
      mobile_number,
      registered_business_name,
      address,
      images,
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

exports.delete_msp = async (req, res) => {
  try {
    const id = req.params;

    if (!id) {
      return res.status(400).send({
        message: "MSP id is required",
      });
    }

    const deletedMsp = await msp_data.findByIdAndDelete(id);

    if (!deletedMsp) {
      return res.status(404).send({
        message: "MSP not found",
      });
    }

    res.status(200).send({
      message: "MSP deleted successfully",
      msp: deletedMsp,
    });
  } catch (error) {
    console.error("Error deleting MSP:", error);
    res.status(500).send({
      message: "Error occurred while deleting MSP",
      error: error.message,
    });
  }
};






exports.uploadBulkMsp = async (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided",
      });
    }

    const toInsert = [];
    const failedRows = [];

    for (let i = 0; i < data.length; i++) {
      let row = data[i];

      // 🔴 Skip if email or mobile missing
      if (!row.email || row.email.toString().trim() === "" || !row.mobile_number) {
        failedRows.push({
          row: i + 1,
          errors: ["Email or mobile missing"],
        });
        continue;
      }

       // 🔹 Check for duplicate email
      const emailExists = await msp_data.findOne({ email: row.email });
      if (emailExists) {
        failedRows.push({
          row: i + 1,
          errors: ["Duplicate email"],
        });
        continue;
      }

      // 🔹 Check for duplicate mobile_number
      const mobileExists = await msp_data.findOne({ mobile_number: row.mobile_number });
      if (mobileExists) {
        failedRows.push({
          row: i + 1,
          errors: ["Duplicate mobile number"],
        });
        continue;
      }

      // 🔹 Convert password to string and hash it
      row.password = await bcrypt.hash(String(row.password), 10);

      // 🔹 Validate row using Joi (after hashing password)
      const { error, value } = mspValidationSchema.validate(row, { abortEarly: false });

      if (error) {
        failedRows.push({
          row: i + 1,
          errors: error.details.map((e) => e.message),
        });
        continue; // skip invalid row
      }

      // 🔹 Prepare row for insertion
      toInsert.push({
        ...row,
        credits: row.credits || 0,
        current_plan: row.current_plan || "",
        subscription_valid_till: row.subscription_valid_till || null,
      });
    }

    let result;
    try {
      result = await msp_data.insertMany(toInsert, { ordered: false }); // unordered allows skipping duplicates
    } catch (err) {
      // Handle duplicate errors
      if (err.code === 11000 && err.writeErrors) {
        err.writeErrors.forEach((e) => {
          failedRows.push({
            row: e.index + 1,
            errors: ["Duplicate email"],
          });
        });
      } else {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
      }
    }

    const savedCount = result ? result.length : 0;
    const failedCount = failedRows.length;

    return res.status(200).json({
      success: true,
      savedCount,
      failedCount,
      failedRows,
    });
  } catch (error) {
    console.error("Bulk upload error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


