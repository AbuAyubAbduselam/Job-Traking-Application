import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/Student";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Button, Input, notification } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import customFetch from "../utils/customFetch";

day.extend(advancedFormat);

const Attendance = ({
  _id,
  idNumber,
  avatar,
  firstName,
  middleName,
  lastName,
}) => {
  const [clickedButton, setClickedButton] = useState("");

  useEffect(() => {
    const storedButton = localStorage.getItem(`${idNumber}_attendance`);
    const storedExpiration = localStorage.getItem(`${idNumber}_expiration`);

    const now = day();
    const today6am = day().hour(6).minute(0).second(0);

    if (storedExpiration && now.isAfter(day(storedExpiration))) {
      localStorage.removeItem(`${idNumber}_attendance`);
      localStorage.removeItem(`${idNumber}_expiration`);
    } else if (storedButton) {
      setClickedButton(storedButton);
    }

    if (!storedExpiration || now.isAfter(day(storedExpiration))) {
      localStorage.setItem(
        `${idNumber}_expiration`,
        today6am.add(1, "day").toISOString()
      );
    }
  }, [idNumber]);

  useEffect(() => {
    if (clickedButton) {
      localStorage.setItem(`${idNumber}_attendance`, clickedButton);
    }
  }, [clickedButton, idNumber]);

  const handleSubmit = async (buttonType) => {
    const attendanceData = {
      firstName,
      middleName,
      idNumber,
      status: buttonType,
    };

    setClickedButton(buttonType);

    try {
      await customFetch.post("/attendance/students", attendanceData);
      notification.success({ message: `${buttonType} recorded successfully!` });
    } catch (error) {
      notification.error({ message: "Failed to record attendance" });
    }
  };

  return (
    <Wrapper>
      <div className="overflow-x-auto mb-5">
        <form>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID No.</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Late</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={avatar} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {firstName} {middleName}
                      </div>
                      <div className="text-sm opacity-50">{lastName}</div>
                    </div>
                  </div>
                </td>
                <td>{idNumber}</td>
                <td>
                  <Button
                    icon={<CheckCircleOutlined />}
                    type={clickedButton === "Present" ? "success" : "primary"}
                    onClick={() => handleSubmit("Present")}
                    disabled={clickedButton === "Present"}
                  />
                </td>
                <td>
                  <Button
                    icon={<CloseCircleOutlined />}
                    type={clickedButton === "Absent" ? "danger" : "primary"}
                    danger
                    onClick={() => handleSubmit("Absent")}
                    disabled={clickedButton === "Absent"}
                  />
                </td>
                <td>
                  <Button
                    icon={<ClockCircleOutlined />}
                    type={clickedButton === "Late" ? "warning" : "primary"}
                    onClick={() => handleSubmit("Late")}
                    disabled={clickedButton === "Late"}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </Wrapper>
  );
};

export default Attendance;
