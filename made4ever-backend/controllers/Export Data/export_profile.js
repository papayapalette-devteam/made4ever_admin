const ExcelJS = require("exceljs");
const UserProfile = require("../../models/AddProfile/add_new_profile");
const mongoose=require('mongoose')
const msp_data = require("../../models/Msp/msp");


exports.exportUserProfilesToExcel = async (req, res) => {
  try {
    const { bureauId } = req.query;

    // 🔹 FILTER
    const query = { IsDeleted: false };
    if (bureauId) query.Bureau = bureauId;

    const profiles = await UserProfile.find(query)
      .populate("Bureau", "name")
      .lean();

    if (!profiles.length) {
      return res.status(404).json({ message: "No data found" });
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("UserProfiles");

    // 🔹 EXCEL COLUMNS (exactly for bulk upload)
    sheet.columns = [
      // Meta
      { header: "_id", key: "_id", width: 25 },
      { header: "Bureau", key: "Bureau", width: 25 },
      { header: "IsActive", key: "IsActive" },
      { header: "IsDeleted", key: "IsDeleted" },
      { header: "DeletedAt", key: "DeletedAt" },
      { header: "createdAt", key: "createdAt" },

      // PersonalDetails
      { header: "Name", key: "Name" },
      { header: "DateOfBirth", key: "DateOfBirth" },
      { header: "TimeOfBirth", key: "TimeOfBirth" },
      { header: "PlaceOfBirth", key: "PlaceOfBirth" },
      { header: "Age", key: "Age" },
      { header: "Complexion", key: "Complexion" },
      { header: "Height", key: "Height" },
      { header: "Weight", key: "Weight" },
      { header: "MotherTongue", key: "MotherTongue" },
      { header: "Gender", key: "Gender" },
      { header: "Drinking", key: "Drinking" },
      { header: "Smoking", key: "Smoking" },
      { header: "Nri", key: "Nri" },
      { header: "NonVeg", key: "NonVeg" },
      { header: "Manglik", key: "Manglik" },
      { header: "Living", key: "Living" },
      { header: "AnyDisability", key: "AnyDisability" },
      { header: "MaritalStatus", key: "MaritalStatus" },
      { header: "HasChildren", key: "HasChildren" },
      { header: "ChildrenCount", key: "ChildrenCount" },

      // ReligiousDetails
      { header: "Religion", key: "Religion" },
      { header: "Community", key: "Community" },
      { header: "Caste", key: "Caste" },
      { header: "Gothram", key: "Gothram" },

      // FamilyDetails
      { header: "FatherName", key: "FatherName" },
      { header: "MotherName", key: "MotherName" },
      { header: "FatherOccupation", key: "FatherOccupation" },
      { header: "MotherOccupation", key: "MotherOccupation" },
      { header: "NoOfSiblings", key: "NoOfSiblings" },
      { header: "FamilyType", key: "FamilyType" },
      { header: "FamilyDescription", key: "FamilyDescription" },

      // EducationDetails
      { header: "HighestEducation", key: "HighestEducation" },
      { header: "EducationSpecialization", key: "EducationSpecialization" },
      { header: "Occupation", key: "Occupation" },
      { header: "AnnualFamilyIncome", key: "AnnualFamilyIncome" },
      { header: "PersonalIncome", key: "PersonalIncome" },
      { header: "EducationDetails", key: "EducationDetails" },
      { header: "OccupationDetails", key: "OccupationDetails" },

      // ContactDetails
      { header: "ParmanentAddress", key: "ParmanentAddress" },
      { header: "Country", key: "Country" },
      { header: "State", key: "State" },
      { header: "City", key: "City" },
      { header: "PostalCode", key: "PostalCode" },

      // PartnerPrefrences (prefixed with Partner)
      { header: "PartnerMinAge", key: "PartnerMinAge" },
      { header: "PartnerMaxAge", key: "PartnerMaxAge" },
      { header: "PartnerMinHeight", key: "PartnerMinHeight" },
      { header: "PartnerMaxHeight", key: "PartnerMaxHeight" },
      { header: "PartnerMaritialStatus", key: "PartnerMaritialStatus" },
      { header: "PartnerNonVeg", key: "PartnerNonVeg" },
      { header: "PartnerManglik", key: "PartnerManglik" },
      { header: "PartnerNri", key: "PartnerNri" },
      { header: "PartnerCommunity", key: "PartnerCommunity" },
      { header: "PartnerReligion", key: "PartnerReligion" },
      { header: "PartnerCaste", key: "PartnerCaste" },
      { header: "PartnerMotherTongue", key: "PartnerMotherTongue" },
      { header: "PartnerAnnualIncome", key: "PartnerAnnualIncome" },
      { header: "PartnerPersonalIncome", key: "PartnerPersonalIncome" },
      { header: "PartnerPropertySize", key: "PartnerPropertySize" },
      { header: "PartnerHeighstEducation", key: "PartnerHeighstEducation" },
      { header: "PartnerOccupation", key: "PartnerOccupation" },
      { header: "PartnerCountry", key: "PartnerCountry" },
      { header: "PartnerState", key: "PartnerState" },
      { header: "PartnerCity", key: "PartnerCity" },

      // PropertyDetails
      { header: "PropertyType", key: "PropertyType" },
      { header: "ResidentialType", key: "ResidentialType" },
      { header: "PropertySize", key: "PropertySize" },
      { header: "PropertyDescription", key: "PropertyDescription" },
    ];

    // 🔹 ROWS
    profiles.forEach((p) => {
      sheet.addRow({
        _id: p._id,
        Bureau: p.Bureau?._id || "",
        IsActive: p.IsActive,
        IsDeleted: p.IsDeleted,
        DeletedAt: p.DeletedAt,
        createdAt: p.createdAt,

        ...p.PersonalDetails,
        ...p.ReligiousDetails,
        ...p.FamilyDetails,
        ...p.EducationDetails,
        ...p.ContactDetails,

        PartnerMinAge: p.PartnerPrefrences?.AgeRange?.MinAge,
        PartnerMaxAge: p.PartnerPrefrences?.AgeRange?.MaxAge,
        PartnerMinHeight: p.PartnerPrefrences?.HeightRange?.MinHeight,
        PartnerMaxHeight: p.PartnerPrefrences?.HeightRange?.MaxHeight,
        PartnerMaritialStatus: p.PartnerPrefrences?.MaritialStatus,
        PartnerNonVeg: p.PartnerPrefrences?.NonVeg,
        PartnerManglik: p.PartnerPrefrences?.Manglik,
        PartnerNri: p.PartnerPrefrences?.Nri,
        PartnerCommunity: p.PartnerPrefrences?.Community,
        PartnerReligion: p.PartnerPrefrences?.Religion,
        PartnerCaste: p.PartnerPrefrences?.Caste,
        PartnerMotherTongue: p.PartnerPrefrences?.MotherTongue,
        PartnerAnnualIncome: p.PartnerPrefrences?.AnnualFamilyIncome,
        PartnerPersonalIncome: p.PartnerPrefrences?.PersonalIncome,
        PartnerPropertySize: p.PartnerPrefrences?.PropertySize,
        PartnerHeighstEducation: (p.PartnerPrefrences?.HeighstEducation || []).join(", "),
        PartnerOccupation: (p.PartnerPrefrences?.Occupation || []).join(", "),
        PartnerCountry: (p.PartnerPrefrences?.Country || []).join(", "),
        PartnerState: (p.PartnerPrefrences?.State || []).join(", "),
        PartnerCity: (p.PartnerPrefrences?.City || []).join(", "),

        ...p.PropertyDetails,
      });
    });

    // 🔹 RESPONSE
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=UserProfiles.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Excel export failed" });
  }
};




// Bulk upload from Excel


exports.bulkUploadUserProfiles = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);

    const sheet = workbook.worksheets[0]; // first sheet

    // 🔹 Map headers to column numbers
    const headerRow = sheet.getRow(1);
    const headerMap = {};
    headerRow.eachCell((cell, colNumber) => {
      headerMap[cell.value] = colNumber;
    });

    const rows = [];

    sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return; // skip header

      const rowValues = row.values;

      rows.push({
        // Meta
         Bureau: rowValues[headerMap["Bureau"]] 
    ? new mongoose.Types.ObjectId(rowValues[headerMap["Bureau"]])
    : null,
        IsActive: rowValues[headerMap["IsActive"]] || false,
        IsDeleted: rowValues[headerMap["IsDeleted"]] || false,
        DeletedAt: rowValues[headerMap["DeletedAt"]] || null,

        // PersonalDetails
        PersonalDetails: {
          Name: rowValues[headerMap["Name"]] || "",
          DateOfBirth: rowValues[headerMap["DateOfBirth"]] || null,
          TimeOfBirth: rowValues[headerMap["TimeOfBirth"]] || null,
          PlaceOfBirth: rowValues[headerMap["PlaceOfBirth"]] || "",
          Age: rowValues[headerMap["Age"]] || null,
          Complexion: rowValues[headerMap["Complexion"]] || "",
          Height: rowValues[headerMap["Height"]] || "",
          Weight: rowValues[headerMap["Weight"]] || "",
          MotherTongue: rowValues[headerMap["MotherTongue"]] || "",
          Gender: rowValues[headerMap["Gender"]] || "",
          Drinking: rowValues[headerMap["Drinking"]] || "",
          Smoking: rowValues[headerMap["Smoking"]] || "",
          Nri: rowValues[headerMap["Nri"]] || false,
          NonVeg: rowValues[headerMap["NonVeg"]] || false,
          Manglik: rowValues[headerMap["Manglik"]] || false,
          Living: rowValues[headerMap["Living"]] || "",
          AnyDisability: rowValues[headerMap["AnyDisability"]] || "",
          MaritalStatus: rowValues[headerMap["MaritalStatus"]] || "",
          HasChildren: rowValues[headerMap["HasChildren"]] || false,
          ChildrenCount: rowValues[headerMap["ChildrenCount"]] || 0,
        },

        // ReligiousDetails
        ReligiousDetails: {
          Religion: rowValues[headerMap["Religion"]] || "",
          Community: rowValues[headerMap["Community"]] || "",
          Caste: rowValues[headerMap["Caste"]] || "",
          Gothram: rowValues[headerMap["Gothram"]] || "",
        },

        // FamilyDetails
        FamilyDetails: {
          FatherName: rowValues[headerMap["FatherName"]] || "",
          MotherName: rowValues[headerMap["MotherName"]] || "",
          FatherOccupation: rowValues[headerMap["FatherOccupation"]] || "",
          MotherOccupation: rowValues[headerMap["MotherOccupation"]] || "",
          NoOfSiblings: rowValues[headerMap["NoOfSiblings"]] || 0,
          FamilyType: rowValues[headerMap["FamilyType"]] || "",
          FamilyDescription: rowValues[headerMap["FamilyDescription"]] || "",
        },

        // EducationDetails
        EducationDetails: {
          HighestEducation: rowValues[headerMap["HighestEducation"]] || "",
          EducationSpecialization: rowValues[headerMap["EducationSpecialization"]] || "",
          Occupation: rowValues[headerMap["Occupation"]] || "",
          AnnualFamilyIncome: rowValues[headerMap["AnnualFamilyIncome"]] || "",
          PersonalIncome: rowValues[headerMap["PersonalIncome"]] || "",
          EducationDetails: rowValues[headerMap["EducationDetails"]] || "",
          OccupationDetails: rowValues[headerMap["OccupationDetails"]] || "",
        },

        // ContactDetails
        ContactDetails: {
          ParmanentAddress: rowValues[headerMap["ParmanentAddress"]] || "",
          Country: rowValues[headerMap["Country"]] || "",
          State: rowValues[headerMap["State"]] || "",
          City: rowValues[headerMap["City"]] || "",
          PostalCode: rowValues[headerMap["PostalCode"]] || "",
        },

        // PartnerPrefrences
        PartnerPrefrences: {
          AgeRange: {
            MinAge: rowValues[headerMap["MinAge"]] || null,
            MaxAge: rowValues[headerMap["MaxAge"]] || null,
          },
          HeightRange: {
            MinHeight: rowValues[headerMap["MinHeight"]] || null,
            MaxHeight: rowValues[headerMap["MaxHeight"]] || null,
          },
          MaritialStatus: rowValues[headerMap["PartnerMaritialStatus"]] || "",
          NonVeg: rowValues[headerMap["PartnerNonVeg"]] || false,
          Manglik: rowValues[headerMap["PartnerManglik"]] || false,
          Nri: rowValues[headerMap["PartnerNri"]] || false,
          Community: rowValues[headerMap["PartnerCommunity"]] || "",
          Religion: rowValues[headerMap["PartnerReligion"]] || "",
          Caste: rowValues[headerMap["PartnerCaste"]] || "",
          MotherTongue: rowValues[headerMap["PartnerMotherTongue"]] || "",
          AnnualFamilyIncome: rowValues[headerMap["PartnerAnnualFamilyIncome"]] || "",
          PersonalIncome: rowValues[headerMap["PartnerPersonalIncome"]] || "",
          PropertySize: rowValues[headerMap["PartnerPropertySize"]] || "",
          HeighstEducation: rowValues[headerMap["HeighstEducation"]]
            ? rowValues[headerMap["HeighstEducation"]].split(",")
            : [],
          Occupation: rowValues[headerMap["PartnerOccupation"]]
            ? rowValues[headerMap["PartnerOccupation"]].split(",")
            : [],
          Country: rowValues[headerMap["PartnerCountry"]]
            ? rowValues[headerMap["PartnerCountry"]].split(",")
            : [],
          State: rowValues[headerMap["PartnerState"]]
            ? rowValues[headerMap["PartnerState"]].split(",")
            : [],
          City: rowValues[headerMap["PartnerCity"]]
            ? rowValues[headerMap["PartnerCity"]].split(",")
            : [],
        },

        // PropertyDetails
        PropertyDetails: {
          PropertyType: rowValues[headerMap["PropertyType"]] || "",
          ResidentialType: rowValues[headerMap["ResidentialType"]] || "",
          PropertySize: rowValues[headerMap["PropertySize"]] || "",
          PropertyDescription: rowValues[headerMap["PropertyDescription"]] || "",
        },

        IsDeleted: false,
      });
    });


// 🔹 ADD LOGIC: find MSP by mobile & set Bureau
for (let i = 0; i < rows.length; i++) {
  const excelRow = sheet.getRow(i + 2); // +2 because header is row 1
  const mobile = excelRow.values[headerMap["mobile"]]
    ? String(excelRow.values[headerMap["mobile"]]).trim()
    : null;

  if (!mobile) continue;

  const msp = await msp_data.findOne({ mobile_number: mobile });

  if (msp) {
    rows[i].Bureau = msp._id;
  }
}



    // 🔹 SAVE ALL TO DB
    const result = await UserProfile.insertMany(rows);
    res.status(200).json({ message: "Bulk upload successful", insertedCount: result.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Bulk upload failed", error: err.message });
  }
};

