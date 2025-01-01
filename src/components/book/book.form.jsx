import { Button } from "antd";


const BookForm = () => {
    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px 0"
            }}>
                <h3>Table Book</h3>
                <Button type="primary">Create book</Button>
            </div>
        </>
    );
}

export default BookForm;