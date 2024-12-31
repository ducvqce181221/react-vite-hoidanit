import { HomeFilled, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Flex, Form, Input, message, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const navigate = useNavigate();
    const timeLoading = 2000;
    const { setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        setConfirmLoading(true);
        setTimeout(async () => {
            const res = await loginAPI(values.email, values.password, timeLoading);

            if (res.data) {
                message.success("Login success!");
                localStorage.setItem("access_token", res.data.access_token);
                setUser(res.data.user);
                navigate("/");
            } else {
                notification.error({
                    message: "Error login!",
                    description: res.message
                })
            }
            setConfirmLoading(false);
        }, timeLoading);
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
                                            {
                                                type: "email",
                                                message: 'Wrong format!',
                                            },
                                        ]}
                                    >
                                        <Input prefix={<MailOutlined style={{ paddingRight: "5px" }} />} placeholder="Enter your email" />
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
                                        <Input.Password
                                            prefix={<LockOutlined style={{ paddingRight: "5px" }} />}
                                            placeholder="Enter your password"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row justify={"center"}>
                                <Col xs={6} md={5}>
                                    <Form.Item>
                                        <Button
                                            block type="primary"
                                            htmlType="submit"
                                            loading={confirmLoading}
                                        >
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