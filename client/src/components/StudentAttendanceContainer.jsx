import { useRef, useState } from "react";
import Student from "./Student";
import Wrapper from "../assets/wrappers/StudentsContainer";
import PageBtnContainer from "./PageBtnContainer";
import { AddStudent } from "../pages";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { UseAllStudentsAttendanceContext } from "../pages/StudentAttendance";
import Attendance from "./Attendance";
import PageBtnContainer2 from "./PageBtnContainer2";

const StudentAttendanceContainer = () => {
  const { data } = UseAllStudentsAttendanceContext();
  const { students, totalStudents, numOfPages } = data;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const modalRef = useRef(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  if (students.length === 0) {
    return (
      <Wrapper>
        <h2>No students to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="flex justify-between mb-10">
        <h5 className="font-bold">
          {totalStudents} {totalStudents > 1 ? "students" : "student"} found
        </h5>
      </div>

      <div className="students">
        {students.map((student) => (
          <Attendance key={student._id} {...student} />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer2 />}
    </Wrapper>
  );
};

export default StudentAttendanceContainer;
