import { Button, Input, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";


const UserForm = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleSubmitBn = async () => {
        const res = await createUserAPI(fullName, email, password, phoneNumber);

        if (res.data) {
            notification.success({
                message: "create user",
                description: "create user successfully!",
            });
            setIsModalOpen(false);
        } else {
            notification.error({
                message: "create user",
                description: JSON.stringify(res.message),
            });
        }

        // setFullName("");
        // setEmail("");
        // setPassword("");
        // setPhoneNumber("");
    };

    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table User</h3>
                <Button type="primary"
                    onClick={() => setIsModalOpen(true)}
                >Create user</Button>
            </div>

            <Modal title="Create user"
                open={isModalOpen}
                onOk={handleSubmitBn}
                onCancel={() => setIsModalOpen(false)}
                maskClosable={false}
                okText={"Create"}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div>
                        <span>Full Name</span>
                        <Input value={fullName}
                            onChange={(event) => { setFullName(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
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
        </div>
    );
}

export default UserForm;