

const TodoData = (props) => {
    const { todoList } = props;

    return (
        <div className="todo-data">
            {todoList.map((item, index) => {
                return (
                    <div className="todo-item">
                        <div className="todo-item-name">{item.name}</div>
                        <button className="todo-item-delete">Delete</button>
                    </div>
                );
            })}
            <div>
                {JSON.stringify(todoList)}
            </div>
        </div>
    );

}

export default TodoData;