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
  avatar,
  fullName,
  gender,
  dateOfBirth,
  qiratLevel,
  schoolName,
  academicStatus,
  address,
  parentName,
  parentPhoneNumber,
}) => {
  const date = day(dateOfBirth).format("MMM Do, YYYY");

  const uploadProps = {
    showUploadList: false,
    beforeUpload: (file) => {
      console.log("Uploaded file:", file);
      return false;
    },
  };

  return (
    <Wrapper>
      <div className="overflow-x-auto mb-5">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Sex</th>
              <th>Qirat Level</th>
              <th>ID No.</th>
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
                  <div>
                    <div className="font-bold">{fullName}</div>
                    <div className="text-sm opacity-50">{date}</div>
                  </div>
                </div>
              </td>
              <td>
                {address}
                <br />
                <span className="badge badge-ghost badge-sm">
                  {parentPhoneNumber}
                </span>
              </td>
              <td>{gender}</td>
              <td>{qiratLevel}</td>
              <td>{qiratLevel}</td>
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
              <th>Parent Name</th>
              <th>Parent Phone</th>
              <th>School Name</th>
              <th>Academic Year</th>
              <th>Age</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="font-bold">{parentName}</div>
              </td>
              <td>{parentPhoneNumber}</td>
              <td>{schoolName}</td>
              <td>{academicStatus}</td>
              <td>20</td>
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
