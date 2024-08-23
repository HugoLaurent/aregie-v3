/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "./budget-recette-style.css";
import { penModif } from "../../../../assets/images";

export default function BudgetRecette({
  formData,
  setShowModalBudget,
  montantDepenseTotal,
  setMontantDepenseTotal,
}) {
  // Calcul du montant total
  const totalMontant = formData.depenseBudget.reduce((acc, depense) => {
    return acc + depense.quantite * depense.prixUnitaire;
  }, 0);

  // Mise à jour de l'état (utiliser useEffect si c'est un composant fonctionnel)
  useEffect(() => {
    setMontantDepenseTotal(totalMontant);
  }, [formData.depenseBudget, setMontantDepenseTotal, totalMontant]);

  return (
    <section className="budget-recette__container">
      <article className="budget-recette__header">
        <p className="first-column">Budget</p>
        <p>Qté</p>
        <p>P.U.</p>
        <p>P.T.</p>
      </article>
      <section className="budget-recette__items-container">
        {formData.depenseBudget.map((depense, index) => (
          <article key={index} className="budget-recette__item">
            <p className="first-column">{depense.budget}</p>
            <p>{depense.quantite}</p>
            <p>{depense.prixUnitaire} €</p>
            <p>{depense.quantite * depense.prixUnitaire} €</p>
            <img src={penModif} alt="" />
          </article>
        ))}
      </section>

      <article className="budget-recette__button-container">
        <button
          onClick={() => setShowModalBudget(true)}
          className="budget-recette__button"
        >
          Ajouter une entrée budget
        </button>
      </article>
      <article className="budget-recette__footer">
        <p>Montant Total</p>
        <p className="budget-recette__footer-total">{montantDepenseTotal} €</p>
      </article>
    </section>
  );
}
