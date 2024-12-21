

const TodoData = (props) => {
    const { todoList, deleteTodo } = props;

    const handleClickDelete = (id) => {
        deleteTodo(id);
    };

    return (
        <div className="todo-data">
            {todoList.map((item, index) => {
                return (
                    <div className="todo-item" key={item.id}>
                        <div className="todo-item-name">{item.name}</div>
                        <button className="todo-item-delete"
                            onClick={() => handleClickDelete(item.id)}
                        >Delete</button>
                    </div>
                );
            })}
        </div>
    );

}

export default TodoData;