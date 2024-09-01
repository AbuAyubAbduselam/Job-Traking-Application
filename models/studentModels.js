import mongoose from "mongoose";
import surahs from "../utils/constant.js";

const StudentSchema = new mongoose.Schema(
  {
    firstName: String,
    middleName: String,
    lastName: String,

    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    qiratLevel: {
      type: String,
      enum: surahs.map((surah) => surah.value),
    },

    classes: {
      type: String,
      enum: ["1", "2", "3", "4"],
    },
    academicYear: {
      type: String,
      enum: ["2017", "2018", "2019", "2020"],
    },
    schoolName: String,
    address: String,

    parentName: String,
    parentPhoneNumber: String,
    avatar: String,

    idNumber: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to generate idNumber
StudentSchema.pre("save", async function (next) {
  if (this.isNew) {
    // Generate a 4-digit random number
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    // Combine the random number with the class
    this.idNumber = `${randomNumber}/${this.classes}`;
  }
  next();
});

// Avoid OverwriteModelError by checking if the model is already compiled
const Student =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default Student;
