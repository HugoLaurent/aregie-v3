import "./recette-style.css";
import { Link } from "react-router-dom";

export default function Recette() {
  return (
    <section className="Recette">
      <Link to="/recettes/ajouter-une-recette">Liste des recettes button</Link>
    </section>
  );
}
