import "./call-to-actions-style.css";
import { useNavigate } from "react-router-dom";
import { eye, print, x } from "../../../../assets/images";

export default function CallToActions({ data }) {
  const navigate = useNavigate(); // Utilisation de useNavigate

  return (
    <div className="call-to-actions__container">
      <button
        onClick={() => {
          navigate("/recettes/" + data.id); // Navigue vers une route interne
        }}
        className="cta-button"
      >
        <img src={eye} alt="" />
      </button>
      <button
        onClick={() => {
          console.log("Ajouter une recherche");
        }}
        className="cta-button"
      >
        <img src={print} alt="" />
      </button>
      <button
        onClick={() => {
          console.log("Ajouter une recherche");
        }}
        className="cta-button"
      >
        <img src={x} alt="" />
      </button>
    </div>
  );
}
