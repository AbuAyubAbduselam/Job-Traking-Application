import { useRef } from "react";
import { Form, Input, Button, notification } from "antd";
import emailjs from "@emailjs/browser";

const { TextArea } = Input;

const ContactPage = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault(); // Prevent the default form submission

    emailjs
      .sendForm(
        "service_4o8exkt",
        "template_p1vwxfq",
        formRef.current,
        "fCrr-yh2Q00Yx5Uxm"
      )
      .then(
        () => {
          notification.success({
            message: "Message Sent",
            description: "Your message has been sent successfully!",
          });
        },
        (error) => {
          console.error("EmailJS error:", error);
          notification.error({
            message: "Message Failed",
            description:
              "There was an issue sending your message. Please try again later.",
          });
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Contact Us
        </h2>
        <form ref={formRef} onSubmit={sendEmail}>
          <Form layout="vertical">
            <Form.Item
              name="user_name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input
                placeholder="Enter your name"
                name="user_name"
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="user_email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <Input
                placeholder="Enter your email"
                name="user_email"
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="message"
              label="Message"
              rules={[
                { required: true, message: "Please enter your message!" },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Enter your message"
                name="message"
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item className="text-center">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-[#10b981] hover:bg-green-600 text-white px-6 py-2 rounded-md"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
