import { useEffect, useState } from "react";
import BookCreate from "../components/book/book.create.controller";
import BookTable from "../components/book/book.table";
import { fetchAllBookAPI } from "../services/book.api.service";
import BookCreateUncontroller from "../components/book/book.create.uncontroller";


const BookPage = () => {

    const [dataBook, setDataBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);

    const loadAllBook = async () => {
        setLoadingTable(true);
        const res = await fetchAllBookAPI(current, pageSize);
        if (res.data) {
            setDataBook(res.data.result);
            setTotal(res.data.meta.total);
            // setCurrent(res.data.meta.current);
            // setPageSize(res.data.meta.pageSize);
        }
        setLoadingTable(false);
    }

    useEffect(() => {
        loadAllBook();
    }, [current, pageSize]);

    return (
        <div style={{ padding: "0 20px" }}>
            {/* <BookCreate
                loadAllBook={loadAllBook}
            /> */}
            <BookCreateUncontroller
                loadAllBook={loadAllBook}
            />
            <BookTable
                dataBook={dataBook}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                loadAllBook={loadAllBook}
                loadingTable={loadingTable}
            />
        </div>

    );
}

export default BookPage;