

const TodoNew = (props) => {
    console.log("check props >>> ", props);
    const { addNewTodo } = props;

    // addNewTodo("Quang Duc");
    const handleClick = () => {
        alert("Click me!");
    }

    const handleOnChange = (name) => {
        console.log("On Change!", name);
    }
    return (
        <div className="todo-new">
            <input type="text" placeholder="Enter anything you like"
                onChange={(event) => handleOnChange(event.target.value)}
            />
            <button
                onClick={handleClick}
            >Add</button>
        </div>
    );

}

export default TodoNew;