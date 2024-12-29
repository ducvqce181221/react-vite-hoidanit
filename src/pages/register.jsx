import { Button, Col, Form, Input, notification, Row } from "antd";
import { registerUserAPI } from "../services/api.service";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log(">>>values: ", values)

        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone);

        if (res.data) {
            notification.success({
                message: "Register User",
                description: "Register user successful!"
            });
            navigate("/login");
        } else {
            notification.error({
                message: "Register User",
                description: res.message
            });
        }
    }

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                name="basic"
                onFinish={onFinish}
                style={{ margin: "30px" }}
            // onFinishFailed={onFinishFailed}
            >
                <Row justify={"center"}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your full name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[
                                {
                                    // required: true,
                                    pattern: new RegExp(/\d+/g),
                                    message: "Wrong format!"
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Button type="primary" onClick={() => form.submit()}>
                        Register
                    </Button>
                    <Button style={{ marginLeft: "10px" }}
                        onClick={() => {
                            form.setFieldsValue({
                                fullName: "name test 1",
                                email: "testdemo@gmail.com",
                                password: 123456789,
                                phone: 66778899
                            })
                        }}>
                        Test
                    </Button>
                </Row>

            </Form>
        </>

    );
}

export default RegisterPage;