import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import StudentAttendance from "../models/StudentAttendanceModel.js";
import dayjs from "dayjs";

export const getAttendance = async (req, res) => {
  const studentAttendance = await StudentAttendance.find();
  res.status(StatusCodes.OK).json({ studentAttendance });
};

export const createAttendance = async (req, res) => {
  try {
    const currentDate = dayjs().format("YYYY-MM-DD");
    const attendanceData = req.body;
    const { idNumber } = attendanceData;
    console.log(req.body);

    const existingAttendance = await StudentAttendance.findOne({
      idNumber: idNumber,
      date: currentDate,
    });

    let Attendance1;
    if (existingAttendance) {
      existingAttendance.set(attendanceData);
      Attendance1 = await existingAttendance.save();
    } else {
      Attendance1 = await StudentAttendance.create({
        attendanceData,
        idNumber,
        date: currentDate,
      });
    }

    console.log(Attendance1);

    res.status(StatusCodes.CREATED).json({ Attendance1 });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
