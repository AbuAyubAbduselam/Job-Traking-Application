import { Form, Input, Select, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext, useNavigate, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const AddStudent = ({ closeModal }) => {
  const { user } = useOutletContext();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "avatar" && value && value[0]) {
        formData.append(key, value[0].originFileObj);
      } else {
        formData.append(key, value);
      }
    });

    const file = formData.get("avatar");
    if (file && file.size > 500000) {
      toast.error("Image size too large");
      return;
    }
    try {
      await customFetch.post("/students", formData);
      toast.success("Student added successfully");
      navigate("/dashboard/all-students");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          fullName: "John Doe",
          gender: "male",
          dateOfBirth: "2000-01-01",
          schoolName: "ABC School",
          classes: "1",
          address: "123 Main St",
          parentName: "Jane Doe",
          parentPhoneNumber: "1234567890",
        }}
        onFinish={handleSubmit} // Handle form submission manually
      >
        <h4 className="form-title">Add Student</h4>
        <div className="form-center">
          <Form.Item
            label="Photo"
            name="avatar"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
            rules={[{ required: true, message: "Please upload an avatar!" }]}
          >
            <Upload
              name="avatar"
              listType="picture"
              maxCount={1}
              accept="image/*"
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
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
            <button className="bg-emerald-500 btn text-cyan-50" type="submit">
              Submit
            </button>
          </Form.Item>
        </div>
        <div className="flex justify-center gap-40 -mb-20"></div>
      </Form>
    </Wrapper>
  );
};

export default AddStudent;
