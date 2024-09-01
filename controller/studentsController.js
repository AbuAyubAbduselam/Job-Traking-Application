import Student from "../models/studentModels.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";
import cloudinary from "cloudinary";
import fs from "fs/promises"; // Use fs/promises for async/await

//===============GET ALL STUDENTS==================//
export const getAllStudents = async (req, res) => {
  const { search, sort, classes } = req.query;

  const queryObject = {};

  if (search) {
    queryObject.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
    ];
  }

  if (classes && classes !== "all") {
    queryObject.classes = classes;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const students = await Student.find(queryObject)
      .sort(sortKey)
      .skip(skip)
      .limit(limit);
    const totalStudents = await Student.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalStudents / limit);

    res
      .status(StatusCodes.OK)
      .json({ totalStudents, numOfPages, currentPage: page, students });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Error fetching students" });
  }
};

//==============CREATE STUDENT====================//

export const createStudent = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;

    const studentDetail = { ...req.body };
    console.log(req.files);
    // Check if a file was uploaded
    if (req.files && req.files.avatar) {
      const file = req.files.avatar;

      // Upload file to Cloudinary
      const response = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "avatars", // You can specify a folder in Cloudinary
      });

      // Remove file from the server after upload
      await fs.unlink(file.tempFilePath);

      // Attach file details to the student object
      studentDetail.avatar = response.secure_url;
      studentDetail.avatarPublicId = response.public_id;
    }

    const student = await Student.create(studentDetail);
    res.status(StatusCodes.CREATED).json({ student });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to create student" });
  }
};

//=============GET SINGLE STUDENT================
export const getSingleStudent = async (req, res) => {
  console.log(11111111);
  const { id } = req.params;

  try {
    const student = await Student.findOne({ _id: id });

    if (!student) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "student not found" });
    }

    res.status(StatusCodes.OK).json({ student });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Error fetching student" });
  }
};

//---------------UPDATE STUDENT
export const updateStudent = async (req, res) => {
  console.log(33333333, req.body);
  const { id } = req.params;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "student not found" });
    }

    res
      .status(StatusCodes.OK)
      .json({ msg: "Student is modified", student: updatedStudent });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Error updating student" });
  }
};

//-----------------DELETE STUDENT
export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const removedStudent = await Student.findByIdAndDelete(id);

    if (!removedStudent) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Student not found" });
    }

    res
      .status(StatusCodes.OK)
      .json({ msg: "Student is deleted", student: removedStudent });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Error deleting student" });
  }
};

export const showStats = async (req, res) => {
  try {
    let stats = await Student.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
      { $group: { _id: "$studentStatus", count: { $sum: 1 } } },
    ]);

    stats = stats.reduce((acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    }, {});

    const defaultStats = {
      pending: stats.pending || 0,
      interview: stats.interview || 0,
      declined: stats.declined || 0,
    };

    let monthlyApplications = await Students.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]);
    monthlyApplications = monthlyApplications
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;

        const date = day()
          .month(month - 1)
          .year(year)
          .format("MMM YY");
        return { date, count };
      })
      .reverse();

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Error fetching statistics" });
  }
};
