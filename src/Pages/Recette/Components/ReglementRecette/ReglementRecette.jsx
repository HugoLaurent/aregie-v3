/* eslint-disable react/prop-types */
import { penModif } from "../../../../assets/images";
import "./reglement-recette-style.css";

export default function ReglementRecette({ formData, setFormData }) {
  return (
    <section className="reglement-recette__container">
      <article className="budget-recette__header">
        <p className="first-column">Règlement</p>
        <p>Total</p>
      </article>
      <article className="budget-recette__item">
        <p className="first-column">007 - ANCV</p>
        <p>20,00€</p>
        <img src={penModif} alt="" />
      </article>
      <article className="budget-recette__item">
        <p className="first-column">007 - ANCV</p>
        <p>20,00€</p>
        <img src={penModif} alt="" />
      </article>
      <article className="budget-recette__button-container">
        <button className="budget-recette__button">Ajouter un règlement</button>
      </article>

      <article className="budget-recette__footer">
        <p>Total des règlements</p>
        <p>30,00€</p>
      </article>
    </section>
  );
}
