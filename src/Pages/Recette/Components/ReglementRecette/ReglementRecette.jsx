/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { penModif } from "../../../../assets/images";
import "./reglement-recette-style.css";

export default function ReglementRecette({
  formData,
  setShowModalReglement,
  montantReglementTotal,
  setMontantReglementTotal,
}) {
  // Calcul du montant total
  const totalMontant = formData.depenseReglement.reduce((acc, depense) => {
    return acc + Number(depense.montant);
  }, 0);

  // Mise à jour de l'état du montant total
  useEffect(() => {
    setMontantReglementTotal(totalMontant);
  }, [formData.depenseReglement, setMontantReglementTotal, totalMontant]);

  return (
    <section className="reglement-recette__container">
      <article className="reglement-recette__header">
        <p className="first-column">Règlement</p>
        <p>Total</p>
      </article>
      {formData.depenseReglement.map((depense, index) => (
        <article key={index} className="reglement-recette__item">
          <p className="first-column">{depense.reglement}</p>
          <p>{depense.montant}€</p>
          <img src={penModif} alt="" />
        </article>
      ))}

      <article className="reglement-recette__button-container">
        <button
          onClick={() => setShowModalReglement(true)}
          className="reglement-recette__button"
        >
          Ajouter un règlement
        </button>
      </article>

      <article className="reglement-recette__footer">
        <p>Total des règlements</p>
        <p>{montantReglementTotal}€</p>
      </article>
    </section>
  );
}
