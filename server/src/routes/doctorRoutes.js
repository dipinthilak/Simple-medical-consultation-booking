import express from "express";
import { addDoctor, getDoctors,getDoctor, getDoctorsAdmin,updateDoctors,setOfficeHours,getOfficeHours,addOverride,getOverrides } from "../controllers/doctorController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();


router.post("/", protect, addDoctor);
router.post("/changestatus/:id/:status",protect,updateDoctors);


router.post("/officehours", protect, setOfficeHours);
router.get("/officehours/:id", protect, getOfficeHours);


router.post("/overrides", protect, addOverride);
router.get("/overrides/:doctor_id", protect, getOverrides);



router.get("/doctor",getDoctor);
router.get("/",getDoctors);
router.get("/doctorlist",getDoctorsAdmin);




export default router;
