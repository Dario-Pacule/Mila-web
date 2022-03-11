import NavBar from "./components/navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./pages/Home";
import Config from "./pages/Config";
import Logic from "./pages/Logic";
import Help from "./pages/Help";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar espUrl={"172.20.10.3"} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/config" element={<Config />} />
          <Route path="/logic" element={<Logic />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
