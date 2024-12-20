import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import { useState } from "react";


const App = () => {

  const [todoList, setList] = useState([
    {id: 1, name: "Learning React"},
    {id: 2, name: "Watching youtube"}
  ])

  const name = "Eric";
  const age = 25;
  const data = {
    city: "rachgia",
    country: "vietnam"
  }

  const addNewTodo = (name) => {
    alert(`call me ${name}`);
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo list</div>
      <TodoNew
        addNewTodo={addNewTodo}
      />
      <TodoData
        name={name}
        age={age}
        data={data}
        todoList={todoList}
      />
      <div className="todo-image">
        <img src={reactLogo} className="logo react" />
      </div>
    </div>
  )
}

export default App
