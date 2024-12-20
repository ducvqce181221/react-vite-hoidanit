import { useState } from "react";


const TodoNew = (props) => {

    const [valueInput, setValueInput] = useState("eric");

    const { addNewTodo } = props;

    // addNewTodo("Quang Duc");
    const handleClick = () => {
        console.log("check value input >>> ", valueInput);
    }

    const handleOnChange = (name) => {
        setValueInput(name);
    }
    return (
        <div className="todo-new">
            <input type="text" placeholder="Enter anything you like"
                onChange={(name) => handleOnChange(name.target.value)}
            />
            <button
                onClick={handleClick}
            >Add</button>
            <span>
                My text input is = {valueInput}
            </span>
        </div>
    );

}

export default TodoNew;