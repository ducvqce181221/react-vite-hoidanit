import { Form, Input, InputNumber, message, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { updateBookAPI } from "../../services/book.api.service";
import { handleUploadFile } from "../../services/user.api.service";


const UpdateUncontrolled = (props) => {
    const { isOpenModal, setIsOpenModal, dataBookUpdate, setDataBookUpdate, loadAllBook } = props;
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataBookUpdate._id) {
            form.setFieldsValue({
                _id: dataBookUpdate._id,
                mainText: dataBookUpdate.mainText,
                author: dataBookUpdate.author,
                price: dataBookUpdate.price,
                quantity: dataBookUpdate.quantity,
                category: dataBookUpdate.category,
            });
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookUpdate.thumbnail}`);
        }
    }, [dataBookUpdate]);

    const callUpdateBook = async (id, thumbnail, title, author, price, quantity, category) => {
        const resUpdateBook = await updateBookAPI(id, thumbnail, title, author, price, quantity, category);
        if (resUpdateBook.data) {
            message.success("Update book successfully!");
            resetAndClose();
            await loadAllBook();
        } else {
            notification.error({
                message: "Error update book!",
                description: JSON.stringify(resUpdateBook.message)
            })
        }
    }

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
        } else {
            const file = event.target.files[0];
            console.log(">>> check file: ", file)
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const onFinish = async (values) => {
        let newThumbnail = "";
        const { _id, mainText, author, price, quantity, category } = values;

        if (!preview && !selectedFile) {
            message.error("Please upload the thumbnail!");
            return;
        }
        if (preview && !selectedFile) {
            newThumbnail = dataBookUpdate.thumbnail;
        }
        if (preview && selectedFile) {
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error upload file!",
                    description: JSON.stringify(resUpload.message)
                })
                return;
            }
        }
        await callUpdateBook(_id, newThumbnail, mainText, author, price, quantity, category);
    }

    const resetAndClose = () => {
        setIsOpenModal(false);
        setTimeout(() => {
            setDataBookUpdate("");
            form.resetFields();
            setSelectedFile(null);
            setPreview(null);
        }, 100);
    }

    return (
        <Modal title="Update Book"
            open={isOpenModal}
            onOk={() => form.submit()}
            onCancel={resetAndClose}
            maskClosable={false}
            okText={"Update"}
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
                    label="ID"
                    name="_id"
                >
                    <Input disabled />
                </Form.Item>

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
                    name="thumbnail"
                >
                    <label
                        style={{
                            background: "orange",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            top: "7px",
                            position: "relative",
                        }}
                        htmlFor="btnUpload"
                    >
                        Upload
                    </label>
                    <input style={{ display: "none" }} type="file" id="btnUpload" hidden
                        onChange={(event) => handleOnChangeFile(event)}
                        onClick={(event) => event.target.value = null}
                    />
                    {preview &&
                        <div>
                            <img style={{ width: "35%", marginTop: "20px", right: "20px", position: "relative" }}
                                src={preview}
                            />
                        </div>
                    }
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default UpdateUncontrolled;