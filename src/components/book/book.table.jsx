import React, { useState } from 'react';
import { notification, Popconfirm, Space, Table, } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ViewBookDetail from './view.book.detail';
import UpdateBookControlled from './updateControlled.book.modal';
import UpdateUncontrolled from './updateUncontrolled.book.modal';
import { deleteBookAPI } from '../../services/book.api.service';


const BookTable = (props) => {
    const { dataBook, current, setCurrent, pageSize, setPageSize, total, loadAllBook } = props;
    const [openDrawer, setOpenDrawer] = useState(false);
    const [dataBookDetail, setDataBookDetail] = useState("");
    const [dataBookUpdate, setDataBookUpdate] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);


    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: "currency", currency: "VND" }).format(value);
    }

    const handleDeleteBook = (id, mainText) => {
        return new Promise((resolve) => {
            setTimeout(async () => {
                const res = await deleteBookAPI(id);
                if (res.data) {
                    notification.success({
                        message: "Delete user",
                        description: `Delete ${mainText} successfully!`,
                    });
                    await loadAllBook();
                } else {
                    notification.error({
                        message: `Delete ${mainText} fail!`,
                        description: JSON.stringify(res.message),
                    });
                }
                resolve(null);
            }, 2000);
        });
    }


    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    (index + 1) + (current - 1) * pageSize
                );
            }
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a href="#" onClick={() => {
                        setOpenDrawer(true)
                        setDataBookDetail(record)
                    }}>
                        {record._id}
                    </a>
                );

            }
        },
        {
            title: 'Title',
            dataIndex: 'mainText',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (_, record) => {
                return (
                    formatCurrency(record.price)
                );

            }
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="large">
                    <EditOutlined style={{ color: "orange", cursor: "pointer" }}
                        onClick={() => {
                            setDataBookUpdate(record)
                            setIsOpenModal(true)
                        }}
                    />
                    <Popconfirm
                        title="Delete the task"
                        description={`Are you sure to delete ${record.mainText}?`}
                        onConfirm={() => handleDeleteBook(record._id, record.mainText)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <DeleteOutlined style={{ color: "red", cursor: "pointer" }}

                        />
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    const onChange = (pagination) => {
        console.log(">>> check pagination: ", pagination)
        if (pagination) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)
            }
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }

    };

    return (
        <>
            <Table columns={columns}
                dataSource={dataBook}
                rowKey={"_id"}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    total: total,
                    showSizeChanger: true,
                    showTotal: (total, range) => {
                        return (
                            <div>
                                {range[0]}-{range[1]} of {total} items
                            </div>
                        );
                    }
                }}
                onChange={onChange}
            />
            <ViewBookDetail
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                dataBookDetail={dataBookDetail}
                setDataBookDetail={setDataBookDetail}
            />
            {/* <UpdateBookControlled
                loadAllBook={loadAllBook}
                dataBookUpdate={dataBookUpdate}
                setDataBookUpdate={setDataBookUpdate}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
            /> */}
            <UpdateUncontrolled
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                dataBookUpdate={dataBookUpdate}
                setDataBookUpdate={setDataBookUpdate}
                loadAllBook={loadAllBook}

            />
        </>


    );
}

export default BookTable;