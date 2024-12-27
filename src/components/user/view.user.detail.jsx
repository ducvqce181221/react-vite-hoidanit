import { Button, Drawer } from 'antd';

const ViewUserDetail = (props) => {

    const { dataDetail, setDataDetail, openDrawer, setOpenDrawer } = props;

    const resetAndCloseDrawer = () => {
        setOpenDrawer(false)
        setTimeout(() => { setDataDetail("") }, 200)
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
                            padding: "8px 11px",
                            borderRadius: "5px",
                        }}
                        >
                            Upload Avatar
                        </label>
                        <input type="file" hidden id='btnUpload' />
                    </div>

                </div>

            </div>
        </Drawer>
    );
}

export default ViewUserDetail;

