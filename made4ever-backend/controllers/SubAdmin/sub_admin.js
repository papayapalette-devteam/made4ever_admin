const bcrypt = require("bcrypt");
const sub_admin = require("../../models/SubAdmin/sub_admin");
const subadminValidationSchema = require("../../Validation/sub_admin");

exports.add_sub_admin = async (req, res) => {
  try {
    // ✅ Validate request body
    const { error, value } = subadminValidationSchema.validate(req.body);
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
      id,
    } = req.body;

    const exitingprofile = await sub_admin.findOne({ email: email });
    if (exitingprofile) {
      res.status(400).send({ message: "This Email id already exist..." });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const new_sub_admin = new sub_admin({
      name,
      email,
      password: hashedPassword,
      mobile_number,
      id,
    });

    // Save the deal to the database
    const resp = await new_sub_admin.save();
    res
      .status(200)
      .send({ message: "Sub Admin added successfully", msp: resp });
  } catch (error) {
    console.error("Error adding sub-admin:", error);
    res.status(500).send({
      message: "Error occurred while adding sub-admin",
      error: error.message,
    });
  }
};

exports.get_sub_admin = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch total count for pagination
    const total = await sub_admin.countDocuments();

    const exitingsub_admin = await sub_admin
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res
      .status(200)
      .send({
        message: "Sub Admin found successfully",
        subadmin: exitingsub_admin,
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      });
  } catch (error) {
    console.error("Error getting sub-admin:", error);
    res.status(500).send({
      message: "Error occurred while getting sub-admin",
      error: error.message,
    });
  }
};
