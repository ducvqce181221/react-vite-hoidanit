import { Button, Form, Input } from "antd";

const RegisterPage = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(">>>values: ", values)
    }

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                name="basic"
                onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            >
                <div style={{
                    margin: "60px"
                }}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Please input your username!',
                    //     },
                    // ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Please input your username!',
                    //     },
                    // ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Please input your username!',
                    //     },
                    // ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phone"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Please input your username!',
                    //     },
                    // ]}
                    >
                        <Input />
                    </Form.Item>

                    <Button type="primary" onClick={() => form.submit()}>
                        Register
                    </Button>
                </div>
            </Form>
        </>

    );
}

export default RegisterPage;