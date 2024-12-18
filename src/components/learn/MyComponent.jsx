
import "./style.css"

// component = html + css + js
const MyComponent = () => {
    // const hoidanit = "eric"; // string
    // const hoidanit = 25;     // number
    // const hoidanit = true;   // boolean
    const hoidanit = [1, 2, 3];
    // const hoidanit = {
    //     name: "hoidanit",
    //     age: 25
    // }

    return (
        <>
            <div> {JSON.stringify(hoidanit)} Eric & HoiDanIT</div>
            <div>{console.log("Eirc")}</div>
            <div className="child"
                style={{ borderRadius: "10px" }}
            >child</div>
        </>

    );
}

export default MyComponent;