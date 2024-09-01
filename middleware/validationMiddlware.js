import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import mongoose from "mongoose";
import Student from "../models/studentModels.js";
import User from "../models/userModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(566666, errors);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no student")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("Not authorized")) {
          throw new UnauthorizedError("Not authorized to access this route");
        }
        throw new BadRequestError();
      }
      next();
    },
  ];
};

export const validateStudentInput = withValidationErrors([
  body("firstName").notEmpty().withMessage("First name is required"),
  body("middleName").notEmpty().withMessage("Middle name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Invalid date format, use YYYY-MM-DD"),
  body("schoolName").notEmpty().withMessage("School name is required"),
  body("classes")
    .notEmpty()
    .withMessage("Class is required")
    .isInt({ min: 1 })
    .withMessage("Class must be a valid number"),
  body("address").notEmpty().withMessage("Address is required"),
  body("parentName").notEmpty().withMessage("Parent name is required"),
  body("parentPhoneNumber")
    .notEmpty()
    .withMessage("Parent phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    const student = await Student.findById(value);
    console.log(111333, student);
    if (!student) throw new NotFoundError(`no student with id : ${value}`);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === student.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("Not authorized to access this route");
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("The pasword character must be greater than 8"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("location").notEmpty().withMessage("location is required"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("email already exists");
      }
    }),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("location").notEmpty().withMessage("location is required"),
]);
