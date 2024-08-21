/* eslint-disable react/prop-types */
import "./budget-recette-style.css";
import { penModif } from "../../../../assets/images";

export default function BudgetRecette({ formData, setFormData }) {
  return (
    <section className="budget-recette__container">
      <article className="budget-recette__header">
        <p className="first-column">Budget</p>
        <p>Qté</p>
        <p>P.U.</p>
        <p>P.T.</p>
      </article>
      <article className="budget-recette__item">
        <p className="first-column">
          PVSQ - 63 - 7066 - Adhésion de toi même tu sais
        </p>
        <p>1</p>
        <p>30,00</p>
        <p>30,00</p>
        <img src={penModif} alt="" />
      </article>
      <article className="budget-recette__button-container">
        <button className="budget-recette__button">
          Ajouter une entrée budget
        </button>
      </article>
      <article className="budget-recette__footer">
        <p>Montant Total</p>
        <p>30,00</p>
      </article>
    </section>
  );
}
