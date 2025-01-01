import React from 'react';
import { Divider, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';



const BookTable = (props) => {
    const { dataBook, current, setCurrent, pageSize, setPageSize, total } = props;

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: "currency", currency: "VND" }).format(value);
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
                    <a href="#">{record._id}</a>
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
                    <>
                        {formatCurrency(record.price)}
                    </>
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
                    <EditOutlined style={{ color: "orange", cursor: "pointer" }} />
                    <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
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
    );
}

export default BookTable;