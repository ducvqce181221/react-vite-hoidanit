import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUserAPI } from '../services/user.api.service';
import { useEffect, useState } from 'react';

const UsersPage = () => {
    const [dataUser, setDataUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);


    const loadUser = async () => {
        setLoadingTable(true);
        const res = await fetchAllUserAPI(current, pageSize);
        if (res.data) {
            setDataUser(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
        setLoadingTable(false);
    };

    useEffect(() => {
        loadUser();
    }, [current, pageSize]);

    return (
        <>
            <div style={{ padding: "0 20px" }}>
                <UserForm loadUser={loadUser} />
                <UserTable
                    dataUser={dataUser}
                    loadUser={loadUser}
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    setCurrent={setCurrent}
                    setPageSize={setPageSize}
                    loadingTable={loadingTable}
                />
            </div>
        </>


    );
}

export default UsersPage;