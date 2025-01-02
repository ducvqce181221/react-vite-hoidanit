import { Button, Input, InputNumber, message, Modal, notification, Select } from "antd";
import { useState } from "react";
import { handleUploadFile } from "../../services/user.api.service";
import { createBookAPI } from "../../services/book.api.service";


const BookCreate = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState(null);
    const [author, setAuthor] = useState(null);
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [category, setCategory] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFile(null)
        setPreview(null);
        setTitle(null);
        setAuthor(null);
        setPrice(null);
        setQuantity(null);
        setCategory(null);
    }

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleCreateBook = async () => {

        if (!(title && author && price && quantity && category)) {
            notification.error({
                message: "Error empty!",
                description: "User must fill in complete data."
            })
            return;
        }

        if (!selectedFile) {
            notification.error({
                message: "Error upload thumbnail!",
                description: "User need upload thumbnail."
            })
            return;
        }

        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            const thumbnail = resUpload.data.fileUploaded;
            const resCreateBook = await createBookAPI(
                thumbnail,
                title,
                author,
                price,
                quantity,
                category
            )
            if (resCreateBook.data) {
                message.success("Create book successfully!!")
                resetAndCloseModal();
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

    return (
        <>
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
                    onOk={handleCreateBook}
                    onCancel={resetAndCloseModal}
                    maskClosable={false}
                    okText={"Create"}
                >
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <div>
                            <span>Title</span>
                            <Input
                                value={title}
                                onChange={(event) => { setTitle(event.target.value) }}
                            />
                        </div>
                        <div>
                            <span>Author</span>
                            <Input
                                value={author}
                                onChange={(event) => { setAuthor(event.target.value) }}
                            />
                        </div>
                        <div>
                            <span>Price</span>
                            <InputNumber style={{ width: "100%" }}
                                value={price}
                                onChange={(event) => { setPrice(event) }}
                            />
                        </div>
                        <div>
                            <span>Quantity</span>
                            <InputNumber style={{ width: "100%" }}
                                value={quantity}
                                onChange={(event) => { setQuantity(event) }}
                            />
                        </div>
                        <div>
                            <span>Category</span>
                            <Select
                                style={{ width: "100%" }}
                                placeholder="Select category"
                                value={category}
                                onChange={(value) => setCategory(value)}
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
                        </div>
                        <div>
                            <p style={{ marginBottom: "10px" }}>Thumbnail</p>
                            <label htmlFor="bntUpload"
                                style={{ background: "orange", padding: "6px 10px", borderRadius: "5px" }}
                            >
                                Upload
                            </label>
                            <input type="file" id="bntUpload" hidden
                                onChange={(event) => handleOnChangeFile(event)}
                                onClick={(event) => event.target.value = null}
                            />
                            {preview &&
                                <div>
                                    <img style={{ marginTop: "10px", width: "40%" }} src={preview} />
                                </div>
                            }
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default BookCreate;