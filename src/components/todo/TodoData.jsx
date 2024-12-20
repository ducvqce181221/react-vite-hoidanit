

const TodoData = (props) => {
    const { name, age, data } = props;

    return (
        <div className="todo-data">
            <div>Learning React</div>
            <div>My name is {name}</div>
            <div>
                {JSON.stringify(props.todoList)}
            </div>
        </div>
    );

}

export default TodoData;