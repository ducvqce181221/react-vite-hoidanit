import React, { useState } from 'react';
import { Drawer } from 'antd';

const ViewBookDetail = (props) => {
    const { openDrawer, setOpenDrawer, dataBookDetail, setDataBookDetail } = props;

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: "currency", currency: "VND" }).format(value);
    }

    const resetAndCloseDrawer = () => {
        setOpenDrawer(false);
        setTimeout(() => {
            setDataBookDetail("");
        }, 200);
    }

    return (
        <>
            <Drawer title="Basic Drawer"
                width={"40vw"}
                onClose={resetAndCloseDrawer}
                open={openDrawer}>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <p><b>ID:</b> {dataBookDetail._id}</p>
                    <p><b>Title:</b> {dataBookDetail.mainText}</p>
                    <p><b>Author:</b> {dataBookDetail.author}</p>
                    <p><b>Category:</b> {dataBookDetail.category}</p>
                    <p><b>Price:</b> {formatCurrency(dataBookDetail.price)}</p>
                    <p><b>Quantity:</b> {dataBookDetail.quantity}</p>
                    <p><b>Sold:</b> {dataBookDetail.sold}</p>
                    <div style={{ marginTop: "5px" }}>
                        <p>Thumbnail:</p>
                        <img style={{ border: "1px solid #ccc", height: "160px", marginTop: "10px" }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookDetail.thumbnail}`}
                        />
                    </div>
                </div>
            </Drawer>
        </>
    );


}

export default ViewBookDetail;