import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Space, Popconfirm, notification } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../../services/api.service';


const UserTable = (props) => {
    const { dataUser, loadUser } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [dataDetail, setDataDetail] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleDeleteByUserId = (id, name) => {
        setConfirmLoading(true);
        setTimeout(async () => {
            const res = await deleteUserAPI(id);
            if (res.data) {
                notification.success({
                    message: "Delete user",
                    description: `Delete ${name} successfully!`,
                });
                await loadUser();
            } else {
                notification.error({
                    message: `Delete ${name} fail!`,
                    description: JSON.stringify(res.message),
                });
            }
            setOpen(false);
            setConfirmLoading(false);
        }, 400);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, render) => {
                return (
                    <a href="#"
                        onClick={() => {
                            setOpenDrawer(true)
                            setDataDetail(render)
                        }}
                    >{render._id}</a>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle" style={{ display: "flex", gap: "30px" }}>
                    <EditOutlined style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setDataUpdate(record)
                            setIsModalUpdateOpen(true)
                        }}
                    />
                    <Popconfirm
                        title="Delete user"
                        description={`Are you sure delete ${record.fullName}?`}
                        open={open === record._id}
                        onConfirm={() => handleDeleteByUserId(record._id, record.fullName)}
                        okButtonProps={{
                            loading: confirmLoading,
                        }}
                        onCancel={() => setOpen(false)}
                        placement="left"
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }}
                            onClick={() => setOpen(record._id)}
                        />
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns}
                dataSource={dataUser}
                rowKey={"_id"}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                setOpenDrawer={setOpenDrawer}
                openDrawer={openDrawer}
            />

        </>
    );
}

export default UserTable;