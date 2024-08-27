import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home, Login, RecetteMain } from "./Pages";
import { BreadCrumbs, NavBar, NavbarColumn, Popup } from "./Components";
import RecetteForm from "./Pages/Recette/Pages/RecetteForm/RecetteForm";

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
                element={<RecetteForm />}
              />
              <Route path="/recettes/:id" element={<RecetteForm />} />

              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
      <Popup />
    </Router>
  );
}

export default App;
