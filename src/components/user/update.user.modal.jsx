import { Input, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import { createUserAPI } from "../../services/api.service";


const UpdateUserModal = (props) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const {
        isModalUpdateOpen, setIsModalUpdateOpen,
        dataUpdate, setDataUpdate
    } = props

    useEffect(() => {
        console.log(">>> check dataUpdate: ", dataUpdate);
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhoneNumber(dataUpdate.phone);
        }

    }, [dataUpdate]);

    const handleSubmitBn = async () => {
        const res = await createUserAPI(fullName, email, password, phoneNumber);

        if (res.data) {
            notification.success({
                message: "create user",
                description: "create user successfully!",
            });
            resetAndCloseModal();
            // await loadUser();
        } else {
            notification.error({
                message: "create user",
                description: JSON.stringify(res.message),
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setId("");
        setFullName("");
        setPhoneNumber("");
        setDataUpdate("");
    }

    return (
        <Modal title="Update user"
            open={isModalUpdateOpen}
            onOk={handleSubmitBn}
            onCancel={resetAndCloseModal}
            maskClosable={false}
            okText={"Save"}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div>
                    <span>Id</span>
                    <Input value={id}
                        disabled
                    />
                </div>
                <div>
                    <span>Full Name</span>
                    <Input value={fullName}
                        onChange={(event) => { setFullName(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Phone Number</span>
                    <Input value={phoneNumber}
                        onChange={(event) => { setPhoneNumber(event.target.value) }}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default UpdateUserModal;