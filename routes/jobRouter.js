import { Router } from "express";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddlware.js";
const router = Router();
import {
  getAllJobs,
  createJob,
  getSingleJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controller/jobsController.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

//router.get("/", getAllJobs);
//router.post("/", createJob);

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .patch(checkForTestUser, validateIdParam, validateJobInput, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
