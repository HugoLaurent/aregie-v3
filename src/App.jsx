import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Login, Recette } from "./Pages";
import { NavBar, NavbarColumn } from "./Components";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <div className="content-container">
          <NavbarColumn />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* ROUTES PIECE COMPTABLE */}
              <Route path="/recettes" element={<Recette />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
