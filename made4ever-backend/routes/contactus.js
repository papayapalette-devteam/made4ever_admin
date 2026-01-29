const express = require("express");
const { createContactus, getContactusList, deleteContactus } = require("../controllers/Contactus/contactus");




const router = express.Router();

router.post("/save-contact-us", createContactus);

router.get("/get-contact-us", getContactusList);

router.delete("/delete-contact-us/:id", deleteContactus);




module.exports = router;
