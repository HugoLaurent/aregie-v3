import "./ajouter-reglement-style.css";
import { useState } from "react";
import { check, warningCircle, x } from "../../../../../assets/images";
import { Switch } from "../../../../../Components";
import { ButtonIconText } from "../../../../../Components/Buttons";

export default function AjouterReglement({
  setShowModalReglement,
  setFormData,
}) {
  const [reglement, setReglement] = useState("");
  const [montant, setMontant] = useState("");
  const [invalidReglement, setInvalidReglement] = useState(false);
  const [invalidMontant, setInvalidMontant] = useState(false);
  const [showTiersPayeur, setShowTiersPayeur] = useState(false);
  const [showNonVersable, setShowNonVersable] = useState(false);
  const [showReferencesExternes, setShowReferencesExternes] = useState(false);

  const handleRecetteSubmit = () => {
    if (reglement === "") {
      setInvalidReglement(true);
      setTimeout(() => setInvalidReglement(false), 3000);
      return;
    }

    if (montant === "") {
      setInvalidMontant(true);
      setTimeout(() => setInvalidMontant(false), 3000);
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      reglement: [
        ...prevFormData.reglement,
        {
          id: prevFormData.reglement.length + 1,
          reglement,
          montant,
          tiersPayeur: showTiersPayeur,
          nonVersable: showNonVersable,
          referencesExternes: showReferencesExternes,
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
          <button type="button" onClick={() => setShowModalReglement(false)}>
            <img src={x} alt="Close" />
          </button>
        </article>
        <article className="ajouter-reglement__text-info">
          <div>
            <label htmlFor="reglement">Modèle</label>
            <select
              id="reglement"
              value={reglement}
              onChange={(e) => setReglement(e.target.value)}
              className={invalidReglement ? "invalid" : ""}
            >
              <option value="" disabled>
                Choisissez un modèle.
              </option>
              <option value="001-Carte Bancaire">001-Carte Bancaire</option>
              <option value="002-Espèce">002-Espèce</option>
            </select>
          </div>
          <div>
            <label htmlFor="montant">Montant du règlement</label>
            <div className="input-number__container">
              <p>€</p>
              <input
                type="number"
                id="montant"
                placeholder="0,00"
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                className={invalidMontant ? "invalid" : ""}
              />
            </div>
          </div>
        </article>
        <section className="ajouter-reglement__parametre-container">
          <hr />
          <article className="ajouter-reglement__add-date">
            <div className="ajouter-reglement-label">
              <Switch setShow={setShowTiersPayeur} show={showTiersPayeur} />
              <p>Ajouter un tiers-payeur</p>
            </div>
          </article>
          <hr />
          <article className="ajouter-reglement__non-versbale">
            <div className="ajouter-reglement-label">
              <Switch setShow={setShowNonVersable} show={showNonVersable} />
              <p>Ligne budgétaire non-versable</p>
            </div>
          </article>
          <hr />
          <article className="ajouter-reglement__commentaire">
            <div className="ajouter-reglement-label">
              <Switch
                setShow={setShowReferencesExternes}
                show={showReferencesExternes}
              />
              <p>Modifier les références externes</p>
            </div>
          </article>
        </section>
        <section className="ajouter-reglement__footer">
          <ButtonIconText
            type="button"
            text="Annuler"
            onClick={() => setShowModalReglement(false)}
          />
          <ButtonIconText
            type="button"
            icon={reglement && montant ? check : warningCircle}
            text="Valider"
            color={reglement && montant ? "#00A7DC" : "rgb(255, 165, 0)"}
            textColor="#fff"
            onClick={handleRecetteSubmit}
          />
        </section>
      </section>
    </section>
  );
}
