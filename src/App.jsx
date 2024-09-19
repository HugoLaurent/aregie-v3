import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Auth, Home, Login, RecetteMain } from "./Pages";
import { BreadCrumbs, NavBar, NavbarColumn, Popup } from "./Components";
import RecetteForm from "./Pages/Recette/Pages/RecetteForm/RecetteForm";
import { useSelector } from "react-redux";

function App() {
  const isLogged = useSelector((state) => state.auth.isLogged);
  console.log(isLogged);

  return (
    <Router>
      <div className="app-container">
        {isLogged && <NavBar />}
        <div className="content-container">
          {isLogged && <NavbarColumn />}
          <div className={isLogged ? "main-content" : ""}>
            <BreadCrumbs />
            <Routes>
              {/* ROUTE AUTH */}
              <Route path="/" element={isLogged ? <Home /> : <Auth />} />

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
