import { useEffect } from "react";
import "./budget-recette-style.css";
import { EditPenIcon, EyeIcon } from "../../../../assets/images";

export default function BudgetRecette({
  formData,
  setSelectedDepense,
  setShowModalBudget,
  montantDepenseTotal,
  setMontantDepenseTotal,
  lockButton,
  selectedDepense,
  recette,
}) {
  console.log(selectedDepense, "ici");

  // Calcul du montant total
  const totalMontant = formData.budgets?.reduce((acc, depense) => {
    return acc + depense.quantite * depense.prixUnitaire;
  }, 0);

  useEffect(() => {
    setMontantDepenseTotal(totalMontant);
  }, [formData.budgets, setMontantDepenseTotal, totalMontant]);

  // Modifier une entrée budget
  const handleModifyDepense = (depense) => {
    console.log("je passe par la");
    setSelectedDepense(depense);
    setShowModalBudget(true);

    // Définit la dépense sélectionnée
  };

  console.log(recette);

  return (
    <section className="budget-recette__container">
      <article className="budget-recette__header">
        <p className="first-column">Budget</p>
        <p>Qté</p>
        <p>P.U.</p>
        <p>P.T.</p>
      </article>
      <section className="budget-recette__items-container">
        {formData.budgets?.map((depense, index) => (
          <article key={index} className="budget-recette__item">
            <p className="first-column">{depense.budget}</p>
            <p>{depense.quantite}</p>
            <p>{depense.prixUnitaire} €</p>
            <p>{depense.quantite * depense.prixUnitaire} €</p>

            <img
              onClick={() => handleModifyDepense(depense)}
              src={!lockButton ? EditPenIcon : EyeIcon}
              alt="Modifier"
            />
          </article>
        ))}
      </section>

      <article
        className={`budget-recette__button-container ${
          lockButton ? "disable" : ""
        }`}
      >
        <button
          disabled={lockButton}
          type="button"
          onClick={() => {
            setSelectedDepense(null); // Réinitialiser la dépense sélectionnée lors de l'ajout d'une nouvelle
            setShowModalBudget(true);
          }}
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
