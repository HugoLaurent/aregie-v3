import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home, Login, RecetteMain } from "./Pages";
import { BreadCrumbs, NavBar, NavbarColumn, Popup } from "./Components";
import { AjouterRecette } from "./Pages/Recette/Pages";
import { greenCheck } from "./assets/images";

function App() {
  const [showPopup, setShowPopup] = useState(true);

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
          </div>
          <Popup
            icon={greenCheck}
            title="Création d'une recette"
            description="Une erreur est survenue"
            bgIcon="#FFC107"
            colorBorder="#FF9800"
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
