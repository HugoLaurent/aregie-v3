import "./resume-recette-style.css";
import { useState, useEffect, useCallback } from "react";
import {
  CheckIcon,
  MathOperationIcon,
  MathOperationGreenIcon,
  MathOperationGreyIcon,
  WarningIcon,
} from "../../../../assets/images";
import { ButtonIconText } from "../../../../Components/Buttons";
import { NumberCounter } from "../../../../Components";

export default function ResumeRecette({
  montantDepenseTotal,
  montantReglementTotal,
  formData,
}) {
  const [actualMontant, setActualMontant] = useState(0);
  const [textValidation, setTextValidation] = useState("");
  const [colorValidation, setColorValidation] = useState("grey");
  const [backgroundText, setBackgroundText] = useState("");
  const [iconButtonValidation, setIconButtonValidation] = useState(WarningIcon);
  const [iconTextValidation, setIconTextValidation] = useState(
    MathOperationGreyIcon
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkFillFormData = useCallback(() => {
    const isTiersFilled = formData.tiers && formData.tiers.trim() !== "";
    const isReferenceFilled =
      formData.reference && formData.reference.trim() !== "";
    const isNoteFilled = formData.note && formData.note.trim() !== "";
    const isBudgetFilled = formData.budgets && formData.budgets.length > 0;
    const isReglementFilled =
      formData.reglements && formData.reglements.length > 0;

    return (
      isTiersFilled &&
      isReferenceFilled &&
      isNoteFilled &&
      isBudgetFilled &&
      isReglementFilled
    );
  });

  const checkEquality = useCallback(() => {
    return montantDepenseTotal === montantReglementTotal;
  }, [montantDepenseTotal, montantReglementTotal]);

  useEffect(() => {
    const validateForm = () => {
      if (!checkFillFormData()) {
        setColorValidation("grey");
        setIconTextValidation(MathOperationGreyIcon);
        setTextValidation(
          "Merci de renseigner tous les champs pour valider la recette."
        );
        setIconButtonValidation(WarningIcon);
      } else if (!checkEquality()) {
        setColorValidation("rgba(255, 165, 0, 1)");
        setIconTextValidation(MathOperationIcon);
        setBackgroundText("yellow");
        setTextValidation(
          "Le montant total des dépenses et des règlements est différent."
        );
        setIconButtonValidation(WarningIcon);
      } else {
        setColorValidation("rgba(0, 129, 227, 1)");
        setIconTextValidation(MathOperationGreenIcon);
        setBackgroundText("green");
        setTextValidation("Votre recette est prête à être validée.");
        setIconButtonValidation(CheckIcon);
      }
    };

    validateForm();
  }, [
    checkEquality,
    checkFillFormData,
    formData,
    montantDepenseTotal,
    montantReglementTotal,
  ]);

  return (
    <section className="resume-recette__container">
      <article className="resume-recette_wrapper">
        <h3>Résumé de la recette</h3>
        <section className="resume-recette__header">
          <article
            className={`resume-recette__highlight-text ${backgroundText}`}
          >
            <img src={iconTextValidation} alt="" />
            <p>{textValidation}</p>
          </article>

          <article className="resume-recette-total">
            <span>Reste à régler</span>
            <NumberCounter
              from={actualMontant}
              to={montantDepenseTotal - montantReglementTotal}
              duration={2}
              setActualMontant={setActualMontant}
            />
          </article>
        </section>
      </article>
      <article className="resume-recette__button-container">
        <ButtonIconText
          disabled={!checkFillFormData()}
          icon={iconButtonValidation}
          text="Valider"
          color={colorValidation}
          hoverColor=""
          textColor="white"
        />
      </article>
    </section>
  );
}
