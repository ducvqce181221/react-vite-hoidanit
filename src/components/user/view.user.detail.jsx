import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateUserAvatarAPI } from '../../services/api.service';

const ViewUserDetail = (props) => {

    const { dataDetail, setDataDetail, openDrawer, setOpenDrawer, loadUser } = props;
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const resetAndCloseDrawer = () => {
        setOpenDrawer(false);
        setTimeout(() => {
            setDataDetail("");
            setSelectedFile(null);
            setPreview(null);
        }, 200);
    }

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleUpdateAvatar = async () => {
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;
            const resUpdateAvatar = await updateUserAvatarAPI(
                dataDetail._id,
                newAvatar,
                dataDetail.fullName,
                dataDetail.phone
            );

            if (resUpdateAvatar.data) {
                resetAndCloseDrawer();
                await loadUser();
                notification.success({
                    message: "Update user avatar",
                    description: "Update avatar successfully!"
                });

            } else {
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }
        } else {
            notification.error({
                message: "Error upload file!",
                description: JSON.stringify(resUpload.message)
            })
        }
        console.log("check resUpload: ", resUpload);
    }

    return (
        <Drawer title="Basic Drawer"
            width={"30vw"}
            open={openDrawer}
            onClose={() => {
                resetAndCloseDrawer()
            }}

        >
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <p>Id: {dataDetail._id}</p>
                    <p>Full name: {dataDetail.fullName}</p>
                    <p>Email: {dataDetail.email}</p>
                    <p>Phone number: {dataDetail.phone}</p>
                </div>
                <div>
                    <p>Avatar:</p>
                    <img style={{ border: "1px solid #ccc", width: "40%", marginTop: "10px" }}
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
                    />
                    <div style={{ marginTop: "20px" }}>
                        <label htmlFor='btnUpload' style={{
                            cursor: "pointer",
                            background: "orange",
                            padding: "8px 8px",
                            borderRadius: "5px",
                        }}
                        >
                            Upload Avatar
                        </label>
                        <input type="file" hidden id='btnUpload'
                            onChange={(event) => handleOnChangeFile(event)}
                        />
                    </div>
                    {preview &&
                        <>
                            <div>
                                <p style={{ marginTop: "15px" }}>Preview</p>
                                <img style={{ width: "50%", marginTop: "5px" }}
                                    src={preview}
                                />
                            </div>
                            <Button type='primary'
                                onClick={handleUpdateAvatar}
                            >
                                Save
                            </Button>
                        </>

                    }
                </div>
            </div>
        </Drawer>
    );
}

export default ViewUserDetail;

