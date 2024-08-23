/* eslint-disable react/prop-types */
import "./resume-recette-style.css";

import {
  check,
  mathOperation,
  mathOperationGreen,
  warningCircle,
} from "../../../../assets/images";
import { ButtonIconText } from "../../../../Components/Buttons";

export default function ResumeRecette({
  montantDepenseTotal,
  montantReglementTotal,
}) {
  const checkEquality = () => {
    return montantDepenseTotal === montantReglementTotal;
  };
  return (
    <section className="resume-recette__container">
      <article className="resume-recette_wrapper">
        <h3>Résumé de la recette</h3>
        <section className="resume-recette__header">
          {checkEquality() ? (
            <article className="resume-recette__highlight-text green">
              <img src={mathOperationGreen} alt="" />
              <p>Votre recette est prête à être validée.</p>
            </article>
          ) : (
            <article className="resume-recette__highlight-text">
              <img src={mathOperation} alt="" />
              <p>Votre budget est supérieur à la somme des règlements.</p>
            </article>
          )}
          <article className="resume-recette-total">
            <span>Reste à régler</span>
            <p>{montantDepenseTotal - montantReglementTotal} €</p>
          </article>
        </section>
      </article>
      <article className="resume-recette__button-container">
        <ButtonIconText
          icon={
            montantDepenseTotal === montantReglementTotal
              ? check
              : warningCircle
          }
          text="Valider"
          color={
            !checkEquality() ? "rgba(255, 165, 0, 1)" : "rgba(0, 129, 227, 1)"
          }
          hoverColor=""
          textColor="white"
        />
      </article>
    </section>
  );
}

// background: rgba(0, 129, 227, 1);rgba(255, 165, 0, 1)
