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

    useEffect(() => {
        loadAllBook();
    }, [current, pageSize]);

    const loadAllBook = async () => {
        const res = await fetchAllBookAPI(current, pageSize);
        if (res.data) {
            setDataBook(res.data.result);
            setTotal(res.data.meta.total);
            // setCurrent(res.data.meta.current);
            // setPageSize(res.data.meta.pageSize);
        }
    }

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
            />
        </div>

    );
}

export default BookPage;