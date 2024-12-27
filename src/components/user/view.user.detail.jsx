import { Drawer } from 'antd';
import { useEffect, useState } from 'react';

const ViewUserDetail = (props) => {

    const { dataDetail, setDataDetail, openDrawer, setOpenDrawer } = props;

    const resetAndCloseDrawer = () => {
        setOpenDrawer(false)
        setDataDetail("");
    }

    return (
        <Drawer title="Basic Drawer"
            open={openDrawer}
            onClose={() => {
                resetAndCloseDrawer()
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>Id: {dataDetail._id}</div>
                <div>Full name: {dataDetail.fullName}</div>
                <div>Email: {dataDetail.email}</div>
                <div>Phone number: {dataDetail.phone}</div>
            </div>
        </Drawer>
    );
}

export default ViewUserDetail;

