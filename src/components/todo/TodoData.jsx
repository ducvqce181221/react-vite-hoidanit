

const TodoData = (props) => {
    const { name, age, data } = props;

    console.log("check props >>> ", props);
    return (
        <div className="todo-data">
            <div>Learning React</div>
            <div>My name is {name}</div>
        </div>
    );

}

export default TodoData;