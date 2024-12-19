

const TodoNew = (props) => {
    console.log("check props >>> ", props);
    const { addNewTodo } = props;

    addNewTodo("Quang Duc");
    return (
        <div className="todo-new">
            <input type="text" placeholder="Enter anything you like" />
            <button>Add</button>
        </div>
    );

}

export default TodoNew;