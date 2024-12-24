import { Button, Input } from "antd";
import { useState } from "react";
import axios from 'axios';


const UserForm = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleClickBn = () => {
        const URL_BACKEND = "http://localhost:8081/api/v1/user";
        const data = {
            fullName: fullName,
            email: email,
            password: password,
            phone: phoneNumber
        }
        axios.post(URL_BACKEND, data);

        console.log("check value >>> ", { fullName, email, password, phoneNumber });
        setFullName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
    };

    return (
        <div className="user-form" style={{ margin: "30px 0" }}>
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
                <div>
                    <Button type="primary"
                        onClick={() => { handleClickBn() }}
                    >Create user</Button>
                </div>
            </div>
        </div>
    );
}

export default UserForm;