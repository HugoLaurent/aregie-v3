import "./ajouter-budget-style.css";
import { useState, useEffect } from "react";
import {
  CheckIcon,
  WarningIcon,
  CloseIcon,
} from "../../../../../assets/images";
import { Switch } from "../../../../../Components";
import { ButtonIconText } from "../../../../../Components/Buttons";

export default function AjouterBudget({
  setShowModalBudget,
  setFormData,
  selectedDepense = null,
  lockButton,
}) {
  const [showNonVersable, setShowNonVersable] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showCommentaire, setShowCommentaire] = useState(false);
  const [prixTotal, setPrixTotal] = useState(0);
  const [quantite, setQuantite] = useState("");
  const [prixUnitaire, setPrixUnitaire] = useState("");
  const [budget, setBudget] = useState("");
  const [modele, setModele] = useState("");
  const [date, setDate] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [invalidModele, setInvalidModele] = useState(false);
  const [invalidBudget, setInvalidBudget] = useState(false);
  const [invalidQuantite, setInvalidQuantite] = useState(false);
  const [invalidPrixUnitaire, setInvalidPrixUnitaire] = useState(false);

  useEffect(() => {
    if (selectedDepense) {
      setModele(selectedDepense.modele);
      setBudget(selectedDepense.budget);
      setQuantite(selectedDepense.quantite);
      setPrixUnitaire(selectedDepense.prixUnitaire);
      setPrixTotal(selectedDepense.quantite * selectedDepense.prixUnitaire);
      setDate(selectedDepense.date);
      setShowNonVersable(selectedDepense.nonVersable);
      setCommentaire(selectedDepense.commentaire);
      setShowDate(Boolean(selectedDepense.date)); // Set to true if there is a date
      setShowCommentaire(Boolean(selectedDepense.commentaire)); // Set to true if there is a commentaire
    } else {
      const savedModele = localStorage.getItem("modeleChoice");
      if (savedModele) {
        setModele(savedModele);
      }
    }
  }, [selectedDepense]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "quantite") {
      setQuantite(value);
      setPrixTotal(value * prixUnitaire);
    } else if (id === "prix unitaire") {
      setPrixUnitaire(value);
      setPrixTotal(quantite * value);
    }
  };

  const handleBudgetSubmit = () => {
    if (modele === "") {
      setInvalidModele(true);
      setTimeout(() => setInvalidModele(false), 3000);
      return;
    }

    if (budget === "") {
      setInvalidBudget(true);
      setTimeout(() => setInvalidBudget(false), 3000);
      return;
    }

    if (quantite === "") {
      setInvalidQuantite(true);
      setTimeout(() => setInvalidQuantite(false), 3000);
      return;
    }

    if (prixUnitaire === "") {
      setInvalidPrixUnitaire(true);
      setTimeout(() => setInvalidPrixUnitaire(false), 3000);
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      budget: selectedDepense
        ? prevFormData.budget.map((item) =>
            item.id === selectedDepense.id
              ? {
                  ...item,
                  modele,
                  budget,
                  quantite,
                  prixUnitaire,
                  date,
                  nonVersable: showNonVersable,
                  commentaire,
                }
              : item
          )
        : [
            ...prevFormData.budget,
            {
              id: prevFormData.budget.length + 1,
              modele,
              budget,
              quantite,
              prixUnitaire,
              date,
              nonVersable: showNonVersable,
              commentaire,
            },
          ],
    }));

    setShowModalBudget(false);
  };

  const handleModeleChoice = (e) => {
    setModele(e.target.value);
    localStorage.setItem("modeleChoice", e.target.value);
  };

  const canValidate =
    modele !== "" && budget !== "" && quantite !== "" && prixUnitaire !== "";

  return (
    <section className="ajouter-budget__container">
      <section className="ajouter-budget__form">
        <article className="ajouter-budget__header">
          <h3>
            {selectedDepense
              ? "Modifier la ligne budgétaire"
              : "Ajouter une ligne budgétaire"}
          </h3>
          <button type="button" onClick={() => setShowModalBudget(false)}>
            <img src={CloseIcon} alt="Close" />
          </button>
        </article>
        <article className="ajouter-budget__text-info">
          <div>
            <label htmlFor="modele">Modèle</label>
            <select
              disabled={lockButton}
              id="modele"
              value={modele}
              onChange={handleModeleChoice}
              className={`modele ${invalidModele ? "invalid" : ""} ${
                modele === "" ? "" : "valid-modele"
              }`}
            >
              <option value="" disabled>
                Choisissez un modèle.
              </option>
              <option value="Boutique">Boutique</option>
              <option value="Entrée">Entrée</option>
            </select>
          </div>
          <div>
            <label htmlFor="budget">Budget</label>
            <select
              disabled={lockButton}
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={`budget ${invalidBudget ? "invalid" : ""} ${
                budget === "" ? "" : "valid-budget"
              }`}
            >
              <option value="" disabled>
                Choisissez un budget.
              </option>
              <option value="ENFJ - 211 - 7067 - Participation des familles aux accueils">
                ENFJ - 211 - 7067 - Participation des familles aux accueils
              </option>
              <option value="ENHG - 222 - 7654 - JE ne sais pas trop quoi mettre">
                ENHG - 222 - 7654 - JE ne sais pas trop quoi mettre
              </option>
            </select>
          </div>
        </article>
        <article className="ajouter-budget__number-info">
          <div>
            <label htmlFor="quantite">Quantité</label>
            <input
              disabled={lockButton}
              type="number"
              id="quantite"
              placeholder="0"
              value={quantite}
              onChange={handleChange}
              className={invalidQuantite ? "invalid" : ""}
            />
          </div>
          <div>
            <label htmlFor="prix unitaire">Prix unitaire</label>
            <input
              disabled={lockButton}
              type="number"
              id="prix unitaire"
              placeholder="0,00"
              value={prixUnitaire}
              onChange={handleChange}
              className={invalidPrixUnitaire ? "invalid" : ""}
            />
          </div>
          <div>
            <label htmlFor="total">Prix Total</label>
            <div className="input-number__container">
              <p>€</p>
              <input
                disabled
                className="input-number"
                type="number"
                id="total"
                value={prixTotal}
                placeholder={prixTotal}
              />
            </div>
          </div>
        </article>
        <section className="ajouter-budget__parametre-container">
          <hr />
          <article className="ajouter-budget__add-date">
            <div className="ajouter-budget-label">
              <Switch setShow={setShowDate} show={showDate} />
              <p>Ajouter une date</p>
            </div>
            {showDate && (
              <input
                disabled={lockButton}
                type="date"
                id="date-debut"
                value={date.split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
              />
            )}
          </article>
          <hr />
          <article className="ajouter-budget__non-versbale">
            <div className="ajouter-budget-label">
              <Switch setShow={setShowNonVersable} show={showNonVersable} />
              <p>Ligne budgétaire non-versable</p>
            </div>
          </article>
          <hr />
          <article className="ajouter-budget__commentaire">
            <div className="ajouter-budget-label">
              <Switch setShow={setShowCommentaire} show={showCommentaire} />
              <p>Commentaires</p>
            </div>
            {showCommentaire && (
              <textarea
                disabled={lockButton}
                id="commentaire"
                value={commentaire}
                onChange={(e) => setCommentaire(e.target.value)}
              />
            )}
          </article>
        </section>
        <section className="ajouter-budget__footer">
          <ButtonIconText
            type="button"
            text={lockButton ? "Fermer" : "Annuler"}
            onClick={() => setShowModalBudget(false)}
          />
          {!lockButton && (
            <ButtonIconText
              disabled={lockButton}
              type="button"
              icon={!canValidate ? WarningIcon : CheckIcon}
              text="Valider"
              color={!canValidate ? "rgb(255, 165, 0)" : "#00A7DC"}
              textColor="#fff"
              onClick={handleBudgetSubmit}
            />
          )}
        </section>
      </section>
    </section>
  );
}
