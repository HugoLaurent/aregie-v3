import { useEffect } from "react";
import { EditPenIcon } from "../../../../assets/images";
import "./reglement-recette-style.css";

export default function ReglementRecette({
  formData,
  setShowModalReglement,
  setSelectedDepense,
  montantReglementTotal,
  setMontantReglementTotal,
  lockButton,
}) {
  // Calcul du montant total
  const totalMontant = formData.reglement?.reduce((acc, depense) => {
    return acc + Number(depense.montant);
  }, 0);

  // Mise à jour de l'état du montant total
  useEffect(() => {
    setMontantReglementTotal(totalMontant);
  }, [formData.reglement, setMontantReglementTotal, totalMontant]);

  const handleModifyRecette = (depense) => {
    setSelectedDepense(depense);
    setShowModalReglement(true);

    // Définit la dépense sélectionnée
  };

  return (
    <section className="reglement-recette__container">
      <article className="reglement-recette__header">
        <p className="first-column">Règlement</p>
        <p>Total</p>
      </article>
      <section className="budget-recette__items-container">
        {formData.reglement?.map((depense, index) => (
          <article key={index} className="reglement-recette__item">
            <p className="first-column">{depense.reglement}</p>
            <p>{depense.montant}€</p>
            {!lockButton && (
              <img
                onClick={() => handleModifyRecette(depense)}
                src={EditPenIcon}
                alt=""
              />
            )}
          </article>
        ))}
      </section>

      <article
        className={`reglement-recette__button-container ${
          lockButton ? "disable" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => setShowModalReglement(true)}
          className="reglement-recette__button"
        >
          Ajouter un règlement
        </button>
      </article>

      <article className="reglement-recette__footer">
        <p>Total des règlements</p>
        <p className="reglement-recette__footer-total">
          {montantReglementTotal} €
        </p>
      </article>
    </section>
  );
}
