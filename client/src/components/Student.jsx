import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Student";
import { Form } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Card, Upload, Avatar, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

day.extend(advancedFormat);

const Student = ({
  _id,
  idNumber,
  avatar,
  firstName,
  lastName,
  middleName,
  gender,
  dateOfBirth,
  classes,
  qiratLevel,
  schoolName,
  academicStatus,
  address,
  parentName,
  parentPhoneNumber,
}) => {
  const date = day(dateOfBirth).format("MMM Do, YYYY");
  const age = day().diff(day(dateOfBirth), "year");
  return (
    <Wrapper>
      <div className="overflow-x-auto mb-5">
        <table className="table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Full Name</th>
              <th>ID No.</th>
              <th>Sex</th>
              <th>Class</th>
              <th>
                <Button type="primary" icon={<InfoCircleOutlined />}></Button>
              </th>
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
                </div>
              </td>
              <td>
                <div>
                  <div className="font-bold">
                    {firstName}
                    <span className="font-bold">{middleName}</span>
                  </div>
                  <div className="text-sm opacity-50">{lastName}</div>
                </div>
              </td>
              <td>{idNumber}</td>
              <td>{gender}</td>
              <td>{classes}</td>
              <td>
                <Link to={`../edit-student/${_id}`}>
                  <Button
                    icon={<EditOutlined />}
                    type="primary"
                    className="edit-btn"
                  ></Button>
                </Link>
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Age</th>
              <th>Address</th>
              <th>Parent Name</th>
              <th>Parent Phone</th>
              <th>School Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{age}</td>
              <td>{address}</td>

              <td>
                <div className="font-bold">{parentName}</div>
              </td>
              <td>{parentPhoneNumber}</td>
              <td>{schoolName}</td>

              <td>
                <Form method="post" action={`../delete-student/${_id}`}>
                  <Button
                    icon={<DeleteOutlined />}
                    type="primary"
                    danger
                    className="delete-btn"
                    htmlType="submit"
                  ></Button>
                </Form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Student;
