
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";


const ParentComponent = (props) => {
  return (
    <div>Parent component</div>
  );
}

const ChildComponent = (props) => {
  return (
    <div>Child component</div>
  );
}

const App = () => {

  return (
    <>
      <ParentComponent />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App
