import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { Home, Login, RecetteMain } from "./Pages";
import { BreadCrumbs, NavBar, NavbarColumn } from "./Components";
import { AjouterRecette } from "./Pages/Recette/Pages";
import MainModal from "./Components/Modals/MainModal";

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <div className="content-container">
          <NavbarColumn />
          <div className="main-content">
            <BreadCrumbs />
            <Routes>
              <Route path="/" element={<Home />} />
              {/* ROUTES PIECE COMPTABLE */}
              <Route path="/recettes" element={<RecetteMain />} />
              <Route
                path="/recettes/ajouter-une-recette"
                element={<AjouterRecette />}
              />
              <Route path="/login" element={<Login />} />
            </Routes>
            {/* <MainModal /> */}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
