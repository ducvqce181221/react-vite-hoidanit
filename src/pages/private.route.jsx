import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Link, Navigate } from "react-router-dom";
import { Button, Result } from "antd";


const PrivateRoute = (props) => {

    const { user } = useContext(AuthContext);

    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    }
    return (
        // <Navigate to={"/login"} replace />
        <Result
            status={"403"}
            title="Unauthorize!"
            subTitle={"You must login to access the resource!!"}
            extra={
                <Button type="primary">
                    <Link to="/">Back to Home Page</Link>
                </Button>
            }
        />
    );
}

export default PrivateRoute;