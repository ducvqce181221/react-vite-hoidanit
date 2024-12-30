import { HomeFilled, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Flex, Form, Input, Row } from "antd";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log(">>>values: ", values)

    }

    return (
        <>
            <Row justify={"center"} style={{ marginTop: "50px" }}>
                <Col xs={20} md={16} lg={8}>
                    <fieldset style={{
                        padding: "15px 30px 15px 30px",
                        border: "1px solid #ccc",
                        borderRadius: "5px"
                    }}>
                        <legend><b>Login</b></legend>
                        <Form
                            name="login"
                            form={form}
                            layout="vertical"
                            initialValues={{
                                remember: true,
                            }}
                            style={{

                            }}
                            onFinish={onFinish}
                        >
                            <Row justify={"center"}>
                                <Col xs={24} md={24}>
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
                                        <Input prefix={<MailOutlined />} placeholder="Enter your email" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row justify={"center"}>
                                <Col xs={24} md={24}>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row justify={"center"}>
                                <Col xs={6} md={5}>
                                    <Form.Item>
                                        <Button block type="primary" htmlType="submit">
                                            Log in
                                        </Button>
                                    </Form.Item>
                                </Col>
                                <Col xs={18} md={19}>
                                    <Form.Item>
                                        <Flex justify="right">
                                            <Link to="/">Go to homepage <HomeFilled /></Link>
                                        </Flex>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        <Divider />
                        <div style={{ textAlign: "center" }}>
                            Do not have account?
                            <Link to={"/register"}> Register here!</Link>
                        </div>
                    </fieldset>
                </Col>
            </Row>
        </>
    );
}

export default LoginPage;