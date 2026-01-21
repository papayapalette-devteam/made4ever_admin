const express=require('express');
const { createFeedback, getAllFeedbacks, updateFeedback, deleteFeedback } = require('../controllers/Feedback/feedback');


const router = express.Router();

router.post("/add-feedback", createFeedback);

router.get("/get-feedback", getAllFeedbacks);

router.put("/update-feedback/:id", updateFeedback);

router.delete("/delete-feedback/:id", deleteFeedback);



module.exports= router;
