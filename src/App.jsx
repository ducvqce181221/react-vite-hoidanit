import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";


const App = () => {

  const name = "Eric";
  const age = 25;
  const data = {
    city: "rachgia",
    country: "vietnam"
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo list</div>
      <TodoNew />
      <TodoData
        name={name}
        age={age}
        data={data}
      />
      <div className="todo-image">
        <img src={reactLogo} className="logo react" />
      </div>
    </div>
  )
}

export default App
