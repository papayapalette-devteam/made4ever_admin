const express = require("express");
const { add_msp, get_msp } = require("../controllers/Msp/msp_data");
const { add_msp_event_image, get_msp_event_image } = require("../controllers/Msp/msp_event_image");
const router = express.Router();




router.post("/Savemsp",  add_msp);

router.get("/Getmsp",  get_msp);

router.post("/Savemsp-event-image",  add_msp_event_image);

router.get("/Getmsp-event-image",  get_msp_event_image);



module.exports = router;
