import TodoData from "./TodoData";
import TodoNew from "./TodoNew";
import reactLogo from "../../assets/react.svg";
import "./todo.css";
import { useState } from "react";


const TodoApp = () => {
    const [todoList, setTodoList] = useState([
        // { id: 1, name: "Learning React" },
        // { id: 2, name: "Watching youtube" }
    ]);

    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const addNewTodo = (name) => {
        const newTodo = {
            id: randomIntFromInterval(1, 100000),
            name
        }
        setTodoList([...todoList, newTodo]);
    };

    const deleteTodo = (idDelete) => {
        const newTodo = todoList.filter((item) => item.id !== idDelete);
        setTodoList(newTodo);
    };

    return (
        <div className="todo-container">
            <div className="todo-title">Todo list</div>
            <TodoNew
                addNewTodo={addNewTodo}
            />

            {todoList.length > 0 ?
                <TodoData
                    todoList={todoList}
                    deleteTodo={deleteTodo}
                />
                :
                <div className="todo-image">
                    <img src={reactLogo} className="logo react" />
                </div>
            }

        </div>
    );
}

export default TodoApp;