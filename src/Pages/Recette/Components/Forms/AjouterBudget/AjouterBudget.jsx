/* eslint-disable react/prop-types */
import "./ajouter-budget-style.css";
import { useState } from "react";
import { check, x } from "../../../../../assets/images";
import { Switch } from "../../../../../Components";
import { ButtonIconText } from "../../../../../Components/Buttons";

export default function AjouterBudget({ setShowModalBudget, setFormData }) {
  const [setShowNonVersable] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showCommentaire, setShowCommentaire] = useState(false);

  const handleBudgetSubmit = () => {
    const budget = document.getElementById("budget").value;
    const quantite = document.getElementById("quantite").value;
    const prixUnitaire = document.getElementById("prix unitaire").value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      budget: [
        ...prevFormData.budget,
        {
          budget,
          quantite,
          prixUnitaire,
        },
      ],
    }));
    setShowModalBudget(false);
  };

  return (
    <section className="ajouter-budget__container">
      <section className="ajouter-budget__form">
        <article className="ajouter-budget__header">
          <h3>Ajouter une ligne budgétaire</h3>
          <button
            onClick={() => {
              setShowModalBudget(false);
            }}
          >
            <img src={x} alt="" />
          </button>
        </article>
        <article className="ajouter-budget__text-info">
          <div>
            <label htmlFor="modele">Modèle</label>
            <select type="text" id="modele">
              <option value="Boutique">Boutique</option>
              <option value="Entrée">Entrée</option>
            </select>
          </div>
          <div>
            <label htmlFor="budget">Budget</label>
            <select type="text" id="budget">
              <option value="ENFJ - 211 - 7067 - Participation des familles aux accueils">
                ENFJ - 211 - 7067 - Participation des familles aux accueils
              </option>
              <option value=" ENHG - 222 - 7654 - JE ne sais pas trop quoi mettre">
                ENHG - 222 - 7654 - JE ne sais pas trop quoi mettre
              </option>
            </select>
          </div>
        </article>
        <article className="ajouter-budget__number-info">
          <div>
            <label htmlFor="quantite">Quantité</label>
            <input type="number" id="quantite" placeholder="0" />
          </div>
          <div>
            <label htmlFor="prix unitaire">Prix unitaire</label>
            <input type="number" id="prix unitaire" placeholder="0,00" />
          </div>
          <div>
            <label htmlFor="total">Prix Total</label>
            <div className="input-number__container">
              <p>€</p>
              <input
                className="input-number"
                type="number"
                id="total"
                placeholder="0,00"
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
            {showDate && <input type="date" id="date-debut" />}
          </article>
          <hr />
          <article className="ajouter-budget__non-versbale">
            <div className="ajouter-budget-label">
              <Switch setShow={setShowNonVersable} show={setShowNonVersable} />
              <p>Ligne budgétaire non-versable</p>
            </div>
          </article>
          <hr />
          <article className="ajouter-budget__commentaire">
            <div className="ajouter-budget-label">
              <Switch setShow={setShowCommentaire} show={showCommentaire} />
              <p>Commentaires</p>
            </div>
            {showCommentaire && <textarea id="commentaire" />}
          </article>
        </section>
        <section className="ajouter-budget__footer">
          <ButtonIconText
            type={"button"}
            text="Annuler"
            onClick={() => setShowModalBudget(false)}
          />
          <ButtonIconText
            type={"button"}
            icon={check}
            text="Valider"
            color={"rgba(107, 114, 128, 0.3)"}
            textColor={"#fff"}
            onClick={handleBudgetSubmit}
          />
        </section>
      </section>
    </section>
  );
}
