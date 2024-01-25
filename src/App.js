import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Configuration from "./Configuration";
import Viewer from "./Viewer";
import Footer from './component/Footer';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Configuration/>} />
          <Route path="/viewer" element={<Viewer />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;