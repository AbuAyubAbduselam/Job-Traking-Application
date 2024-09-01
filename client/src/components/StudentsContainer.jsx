import { useRef, useState } from "react";
import Student from "./Student";
import Wrapper from "../assets/wrappers/StudentsContainer";
import { useAllStudentsContext } from "../pages/AllStudents";
import PageBtnContainer from "./PageBtnContainer";
import { AddStudent } from "../pages";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

const StudentsContainer = () => {
  const { data } = useAllStudentsContext();
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
        <div className="flex justify-between mb-10">
          <Button
            className="btn flex"
            onClick={showModal}
            icon={<PlusOutlined />}
          >
            <span className="ml-3">Add Student</span>
          </Button>
          {isModalVisible && (
            <div className="modal modal-open">
              <div
                ref={modalRef}
                className="modal-box bg-white max-w-7xl relative"
              >
                <button
                  className="fixed top-2 right-4 bg-transparent border-0 text-gray-500 text-lg"
                  onClick={closeModal}
                >
                  <CloseOutlined />
                </button>
                <AddStudent closeModal={closeModal} />
              </div>
            </div>
          )}
        </div>
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
        <Button
          className="btn flex"
          onClick={showModal}
          icon={<PlusOutlined />}
        >
          <span className="ml-3">Add Student</span>
        </Button>
        {isModalVisible && (
          <div className="modal modal-open">
            <div
              ref={modalRef}
              className="modal-box bg-white max-w-7xl relative"
            >
              <button
                className="fixed top-2 right-4 bg-transparent border-0 text-gray-500 text-lg"
                onClick={closeModal}
              >
                <CloseOutlined />
              </button>
              <AddStudent closeModal={closeModal} />
            </div>
          </div>
        )}
      </div>

      <div className="students">
        {students.map((student) => (
          <Student key={student._id} {...student} />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default StudentsContainer;
