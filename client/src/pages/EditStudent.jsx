import { useLoaderData, useParams, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Button, Input, Select, Upload, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/students/${params.id}`);

    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/all-students");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/students/${params.id}`, data);
    toast.success("Student edited successfully");
    return redirect("/dashboard/all-students");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditStudent = () => {
  const { student } = useLoaderData();

  const onFinish = async (values) => {
    try {
      await customFetch.patch(`/students/${student._id}`, values);
      toast.success("Student edited successfully");
      return redirect("/dashboard/all-students");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <Wrapper>
      <Form
        layout="vertical"
        initialValues={{
          firstName: student.firstName,
          middleName: student.middleName,
          lastName: student.lastName,
          gender: student.gender,
          dateOfBirth: student.dateOfBirth,
          schoolName: student.schoolName,
          classes: student.classes,
          address: student.address,
          parentName: student.parentName,
          parentPhoneNumber: student.parentPhoneNumber,
        }}
        onFinish={onFinish}
      >
        <h4 className="form-title">Edit Student</h4>
        <div className="form-center">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Middle Name"
            name="middleName"
            rules={[
              { required: true, message: "Please input the middle name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select the gender!" }]}
          >
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Birth Date"
            name="dateOfBirth"
            rules={[
              { required: true, message: "Please select the birth date!" },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="School Name"
            name="schoolName"
            rules={[
              { required: true, message: "Please input the School Name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Academic Year"
            name="academicStatus"
            rules={[
              { required: true, message: "Please select the Academic Year!" },
            ]}
          >
            <Select>
              <Select.Option value="2017">2017</Select.Option>
              <Select.Option value="2018">2018</Select.Option>
              <Select.Option value="2019">2019</Select.Option>
              <Select.Option value="2020">2020</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Class"
            name="classes"
            rules={[{ required: true, message: "Please select the class!" }]}
          >
            <Select>
              <Select.Option value="1">Class 1</Select.Option>
              <Select.Option value="2">Class 2</Select.Option>
              <Select.Option value="3">Class 3</Select.Option>
              <Select.Option value="4">Class 4</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Parent Name"
            name="parentName"
            rules={[
              { required: true, message: "Please input the parent's name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Parent Phone"
            name="parentPhoneNumber"
            rules={[
              {
                required: true,
                message: "Please input the parent's phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditStudent;
