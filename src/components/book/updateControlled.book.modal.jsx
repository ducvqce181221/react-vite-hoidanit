import { Input, InputNumber, message, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { updateBookAPI } from "../../services/book.api.service";
import { handleUploadFile } from "../../services/user.api.service";


const UpdateBook = (props) => {
    const { dataBookUpdate, setDataBookUpdate, isOpenModal, setIsOpenModal, loadAllBook } = props;

    const [id, setId] = useState(null);
    const [title, setTitle] = useState(null);
    const [author, setAuthor] = useState(null);
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [category, setCategory] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        if (dataBookUpdate._id) {
            setId(dataBookUpdate._id);
            setTitle(dataBookUpdate.mainText);
            setAuthor(dataBookUpdate.author);
            setPrice(dataBookUpdate.price);
            setQuantity(dataBookUpdate.quantity);
            setCategory(dataBookUpdate.category);
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookUpdate.thumbnail}`);
        }
    }, [dataBookUpdate])

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

    const callUpdateBook = async (thumbnail) => {
        const resUpdateBook = await updateBookAPI(id, thumbnail, title, author, price, quantity, category);
        if (resUpdateBook.data) {
            message.success("Update book successfully!");
            resetAndCloseModal();
            await loadAllBook();
        } else {
            notification.error({
                message: "Error update book!",
                description: JSON.stringify(resUpdateBook.message)
            })
        }
    }

    const handleUpdate = async () => {
        let newThumbnail = "";

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
        await callUpdateBook(newThumbnail);
    }

    const resetAndCloseModal = () => {
        setIsOpenModal(false);
        setId("");
        setTitle("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setDataBookUpdate("");
        setCategory(null);
        setPreview(null);
    }

    return (
        <Modal title="Update Book"
            open={isOpenModal}
            onOk={handleUpdate}
            onCancel={resetAndCloseModal}
            maskClosable={false}
            okText={"Save"}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div>
                    <span>ID</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
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
                            <img style={{ marginTop: "12px", height: "120px" }} src={preview} />
                        </div>
                    }
                </div>
            </div>
        </Modal>
    );
}

export default UpdateBook;