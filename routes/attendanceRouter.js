import { Router } from "express";
import {
  createAttendance,
  getAttendance,
} from "../controller/attendanceController.js";

const router = Router();

router.post("/students", createAttendance).get("/students", getAttendance);
export default router;
