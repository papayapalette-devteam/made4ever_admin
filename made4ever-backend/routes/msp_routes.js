const express = require("express");
const { add_msp, get_msp } = require("../controllers/Msp/msp_data");
const { add_msp_event_image, get_msp_event_image } = require("../controllers/Msp/msp_event_image");
const { add_msp_gallary, get_msp_gallary } = require("../controllers/Msp/msp_gallary");
const { add_msp_video, get_msp_video } = require("../controllers/Msp/msp_video");
const router = express.Router();




router.post("/Savemsp",  add_msp);

router.get("/Getmsp",  get_msp);

router.post("/Savemsp-event-image",  add_msp_event_image);

router.get("/Getmsp-event-image",  get_msp_event_image);

router.post("/Savemsp-gallary",  add_msp_gallary);

router.get("/Getmsp-gallary",  get_msp_gallary);

router.post("/Savemsp-video",  add_msp_video);

router.get("/Getmsp-video",  get_msp_video);



module.exports = router;
