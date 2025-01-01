import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button, Menu, message } from 'antd';
import { BookOutlined, HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';


const Header = () => {
    const [current, setCurrent] = useState('');
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();


    const logout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            });
            message.success(res.data);
            navigate("/");

        }
    }

    console.log("check user: ", user)

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UserOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <BookOutlined />,
        },
        ...(!user.id ? [
            {
                label: "Options",
                key: 'options',
                icon: <SettingOutlined />,
                children: [
                    {
                        label: <Link to={"/login"}>Login</Link>,
                        key: 'login',
                    },
                    {
                        label: <Link to={"/register"}>Register</Link>,
                        key: 'register',
                    },
                ],
            },
        ] : [
            {
                label: `Welcome ${user.fullName}!`,
                key: 'welcome',
                icon: <SettingOutlined />,
                children: [
                    {
                        label: <div onClick={logout}>Log Out</div>,
                        key: 'logOut',
                    },
                ],
            },
        ])

    ]

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
}

export default Header;