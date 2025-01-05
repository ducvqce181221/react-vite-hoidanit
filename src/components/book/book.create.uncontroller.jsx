import { useState } from "react";
import React from 'react';
import { Button, Form, Input, InputNumber, message, Modal, notification, Select } from 'antd';
import { handleUploadFile } from "../../services/user.api.service";
import { createBookAPI } from "../../services/book.api.service";


const BookCreateUncontroller = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [form] = Form.useForm();

    const { loadAllBook } = props;

    const onFinish = async (values) => {
        console.log(">>> values: ", values);

        if (!selectedFile) {
            message.error("Please upload the thumbnail.");
            return;
        }

        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            const thumbnail = resUpload.data.fileUploaded;
            const resCreateBook = await createBookAPI(
                thumbnail,
                values.mainText,
                values.author,
                values.price,
                values.quantity,
                values.category
            );
            if (resCreateBook.data) {
                message.success("Create book successfully!");
                resetAndClose();
                await loadAllBook();
            } else {
                notification.error({
                    message: "Error create book!",
                    description: JSON.stringify(resCreateBook.message)
                })
            }
        } else {
            notification.error({
                message: "Error upload file!",
                description: JSON.stringify(resUpload.message)
            })
        }
    }

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
        } else {
            const file = event.target.files[0];
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const resetAndClose = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            form.resetFields();
            setPreview(null);
            setSelectedFile(null);
        }, 100);
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0"
        }}>
            <h3>Table Book</h3>
            <Button type="primary"
                onClick={() => { setIsModalOpen(true) }}
            >
                Create book
            </Button>

            <Modal title="Create Book"
                open={isModalOpen}
                onOk={() => form.submit()}
                onCancel={resetAndClose}
                maskClosable={false}
                okText={"Create"}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 5,
                    }}
                    // labelAlign="left"
                    onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Main Text"
                        name="mainText"
                        rules={[
                            {
                                required: true,
                                message: 'Please input main text!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Author"
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: 'Please input author!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input price!',
                            },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }}
                            min={1}
                            max={9999999}
                            addonAfter="VND"
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Please input quantity!',
                            },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }}
                            min={1}
                            max={9999}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Please select category!',
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Select category"
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Thumbnail"
                    >
                        <label style={{ background: "orange", padding: "6px 10px", borderRadius: "5px" }}
                            htmlFor="btnUpload"
                        >
                            Upload
                        </label>
                        <input style={{ display: "none" }} type="file" id="btnUpload" hidden
                            onChange={(event) => handleOnChangeFile(event)}
                            onClick={(event) => event.target.value = null}
                        />
                    </Form.Item>
                    {preview &&
                        <div>
                            <img style={{ width: "40%", marginLeft: "20px" }}
                                src={preview}
                            />
                        </div>
                    }
                </Form>
            </Modal>
        </div>


    );

}

export default BookCreateUncontroller;