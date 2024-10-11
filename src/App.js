import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import { MdChevronRight } from "react-icons/md";

function App() {
  const handleClick = (style) => {};

  return (
    <div className="app">
      <NavBar />
      <div className="home">
        <Sidebar />
        <div className="op-sidebar">
          <button onClick={handleClick}>
            <MdChevronRight />
          </button>
        </div>
        <Board />
      </div>
    </div>
  );
}

export default App;
