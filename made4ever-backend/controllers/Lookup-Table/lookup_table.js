const mongoose = require("mongoose");
const LookupTable = require("../../models/Lookup_Table/lookup_data");
const lookup_validation_schema=require('../../Validation/lookup_table');
// const { log } = require("winston");


//  Save or Update Lookup
exports.saveLookup = async (req, res) => {
  try {

      // ✅ Validate request body
    const { error, value } = lookup_validation_schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }

   

    const {lookup_id,lookup_type,lookup_value,parent_lookup_id, is_active,other} = req.body;

       // 2️⃣ Check for duplicates
    const exists = await LookupTable.findOne({
      lookup_type: lookup_type,
      lookup_value: lookup_value,
      parent_lookup_id:parent_lookup_id
    });

    if (exists) {
      return res.status(400).json({
        message: `lookup_value '${value.lookup_value}' already exists for lookup_type '${value.lookup_type}'`,
      });
    }


    if (!lookup_id) {
      // Insert new lookup
      const newlookup_data = {
        lookup_type,
        lookup_value, 
        parent_lookup_id: parent_lookup_id
          ?new mongoose.Types.ObjectId(parent_lookup_id)
          : null,
        is_active,
        other,
      };

      const newLookup = await LookupTable.create(newlookup_data);

      res.status(200).send({Message:"Lookup Data Saves",LookupData:newLookup})
    } else {
      // Update existing lookup

      const new_lookup_data = {
        lookup_type,
        lookup_value,
        parent_lookup_id: parent_lookup_id
          ?new mongoose.Types.ObjectId(parent_lookup_id)
          : null,
        is_active,
        other,
      };

      const updatedLookup = await LookupTable.findByIdAndUpdate(
        lookup_id,
        { $set: new_lookup_data },
        { new: true }
      );

      res.status(200).send({Message:"Lookup Data Update",LookupData:updatedLookup})

   
    }
  } catch (error) {
    console.error(error);
    
  }
};



exports.getLookup = async (req, res) => {
  try {
    const { lookup_type, parent_lookup_id, page, limit,search="" } = req.query;

    if (!lookup_type) {
      return res.status(400).json({
        status: "error",
        message: "lookup_type is required",
      });
    }

    // Build query object
    const query = { lookup_type };
   
    if (parent_lookup_id) {
      if (!mongoose.Types.ObjectId.isValid(parent_lookup_id)) {
        return res.status(400).json({
          status: "error",
          message: "Invalid parent_lookup_id",
        });
      }
      query.parent_lookup_id =new mongoose.Types.ObjectId(parent_lookup_id);
    }

   if (search && search.trim() !== "") {
      query.lookup_value = {
        $regex: search,
        $options: "i", // case insensitive
      };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch total count for pagination
    const total = await LookupTable.countDocuments(query);

    // Fetch paginated data
    const lookups = await LookupTable.find(query)
      .populate("parent_lookup_id")
      // .sort({ createdAt: -1 })
      .sort({lookup_value:1})
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      status: "success",
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
      data: lookups,
    });
  } catch (error) {
    console.error("❌ Error fetching lookups:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};



exports.remove_lookup = async (req, res) => {
  try {
    const  id = req.query.id;
 
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "lookup_id is required",
      });
    }


    

    // Fetch paginated data
    const lookups = await LookupTable.findByIdAndDelete(id)
    
    res.status(200).json({
      status: "success",
      data: lookups,
    });
  } catch (error) {
    console.error("❌ Error deleting lookups:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
