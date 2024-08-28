import "./call-to-actions-style.css";
import { useNavigate } from "react-router-dom";
import { EyeIcon, PrintIcon, CloseIcon } from "../../../../assets/images";

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
        <img src={EyeIcon} alt="" />
      </button>
      <button
        onClick={() => {
          console.log("Ajouter une recherche");
        }}
        className="cta-button"
      >
        <img src={PrintIcon} alt="" />
      </button>
      <button
        onClick={() => {
          console.log("Ajouter une recherche");
        }}
        className="cta-button"
      >
        <img src={CloseIcon} alt="" />
      </button>
    </div>
  );
}
