import express from "express";
import { getAvailability, bookAppointment } from "../controllers/appointmentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id/availability", getAvailability);
router.post("/book", protect, bookAppointment);

export default router;
