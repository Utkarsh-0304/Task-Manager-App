import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import Board from "./components/Board";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Board />
    </div>
  );
}

export default App;
