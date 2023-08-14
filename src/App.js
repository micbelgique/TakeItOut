import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Configuration from "./Configuration";
import Viewer from "./Viewer";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Configuration/>} />
          <Route path="/viewer" element={<Viewer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;