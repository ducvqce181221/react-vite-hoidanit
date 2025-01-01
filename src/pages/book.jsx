import { useEffect, useState } from "react";
import BookForm from "../components/book/book.form";
import BookTable from "../components/book/book.table";
import { fetchAllBookAPI } from "../services/book.api.service";


const BookPage = () => {

    const [dataBook, setDataBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchAllBook();
    }, [current, pageSize]);

    const fetchAllBook = async () => {
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
            <BookForm />
            <BookTable
                dataBook={dataBook}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
            />
        </div>

    );
}

export default BookPage;