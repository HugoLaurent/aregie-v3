import "./resume-recette-style.css";

import { mathOperation, warningCircle } from "../../../../assets/images";
import { ButtonIconText } from "../../../../Components/Buttons";

export default function ResumeRecette() {
  return (
    <section className="resume-recette__container">
      <article className="resume-recette_wrapper">
        <h3>Résumé de la recette</h3>
        <section className="resume-recette__header">
          <article className="resume-recette__highlight-text">
            <img src={mathOperation} alt="" />
            <p>Votre budget est supérieur à la somme des règlements.</p>
          </article>
          <article className="resume-recette-total">
            <span>Reste à régler</span>
            <p>10,00€</p>
          </article>
        </section>
      </article>
      <article className="resume-recette__button-container">
        <ButtonIconText
          icon={warningCircle}
          text="Valider"
          color="rgba(255, 165, 0, 1)"
          hoverColor=""
          textColor="white"
        />
      </article>
    </section>
  );
}
