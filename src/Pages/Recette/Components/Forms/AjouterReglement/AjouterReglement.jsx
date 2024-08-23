/* eslint-disable react/prop-types */
// Parent Component: AjouterRecette
import "./ajouter-reglement-style.css";
import { useState } from "react";
import { check, x } from "../../../../../assets/images";
import { Switch } from "../../../../../Components";
import { ButtonIconText } from "../../../../../Components/Buttons";

export default function AjouterReglement({
  setShowModalReglement,
  setFormData,
}) {
  const [setShowNonVersable] = useState(false);

  const handleRecetteSubmit = () => {
    const reglement = document.getElementById("reglement").value;
    const montant = document.getElementById("montant").value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      reglement: [
        ...prevFormData.reglement,
        {
          reglement,
          montant,
        },
      ],
    }));
    setShowModalReglement(false);
  };

  return (
    <section className="ajouter-reglement__container">
      <section className="ajouter-reglement__form">
        <article className="ajouter-reglement__header">
          <h3>Ajouter un règlement</h3>
          <button
            onClick={() => {
              setShowModalReglement(false);
            }}
          >
            <img src={x} alt="" />
          </button>
        </article>
        <article className="ajouter-reglement__text-info">
          <div>
            <label htmlFor="reglement">Modèle</label>
            <select type="text" id="reglement">
              <option value="001-Carte Bancaire">001-Carte Bancaire</option>
              <option value="002-Espèce">002-Espèce</option>
            </select>
          </div>
          <div>
            <label htmlFor="montant">Montant du règlement</label>
            <div className="input-number__container">
              <p>€</p>
              <input
                className="input-number"
                type="number"
                id="montant"
                placeholder="0,00"
              />
            </div>
          </div>
        </article>
        <section className="ajouter-reglement__parametre-container">
          <hr />
          <article className="ajouter-reglement__add-date">
            <div className="ajouter-reglement-label">
              <Switch />
              <p>Ajouter un tiers-payeur</p>
            </div>
          </article>
          <hr />
          <article className="ajouter-reglement__non-versbale">
            <div className="ajouter-reglement-label">
              <Switch setShow={setShowNonVersable} show={setShowNonVersable} />
              <p>Ligne budgétaire non-versable</p>
            </div>
          </article>
          <hr />
          <article className="ajouter-reglement__commentaire">
            <div className="ajouter-reglement-label">
              <Switch />
              <p>Modifier les références externes</p>
            </div>
          </article>
        </section>
        <section className="ajouter-reglement__footer">
          <ButtonIconText
            text="Annuler"
            onClick={() => setShowModalReglement(false)}
          />
          <ButtonIconText
            type={"button"}
            icon={check}
            text="Valider"
            color={"rgba(107, 114, 128, 0.3)"}
            textColor={"#fff"}
            onClick={handleRecetteSubmit}
          />
        </section>
      </section>
    </section>
  );
}
