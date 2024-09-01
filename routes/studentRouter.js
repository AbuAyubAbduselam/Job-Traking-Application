import { Router } from "express";
import {
  validateStudentInput,
  validateIdParam,
} from "../middleware/validationMiddlware.js";
const router = Router();
import {
  getAllStudents,
  createStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  showStats,
} from "../controller/studentsController.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

//router.get("/", getAllStudents);
router.post("/", checkForTestUser, validateStudentInput, createStudent);

router.route("/").get(getAllStudents);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(getSingleStudent)
  .patch(validateIdParam, validateStudentInput, updateStudent)
  .delete(validateIdParam, deleteStudent);

export default router;
