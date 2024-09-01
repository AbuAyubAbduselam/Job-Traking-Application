import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import "antd/dist/reset.css";

const ContactPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-4">Contact Me</h2>
        <p className="text-center text-gray-600 mb-8 font-bold text-2xl">
          ማንኛውም አስተያየትና ጥያቄዎች ካሉዎት ተቀብለን ምላሽ ለመስጠት ዝግጁ ነን
        </p>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="flex items-center space-x-4">
            <MailOutlined className="text-xl text-blue-500" />
            <div>
              <h4 className="font-semibold mb-5">Email</h4>
              <a href="mailto:example@example.com" className="text-gray-600">
                BoleAnsar@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <PhoneOutlined className="text-xl text-green-500" />
            <div>
              <h4 className="font-semibold mb-5">Phone</h4>
              <a href="tel:+1234567890" className="text-gray-600">
                +251 960 1628 02
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <EnvironmentOutlined className="text-xl text-red-500" />
            <div>
              <h4 className="font-semibold mb-5">Location</h4>
              <p className="text-gray-600">
                Bole Bulbula Wereda 12 Ansar Mesjid
              </p>
            </div>
          </div>
        </div>

        <Form form={form} name="contact" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input placeholder="Your Full Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Your Email" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <Input.TextArea rows={4} placeholder="Your Message" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ContactPage;
