import "./ajouter-reglement-style.css";
import { useState, useEffect } from "react";
import { check, warningCircle, x } from "../../../../../assets/images";
import { Switch } from "../../../../../Components";
import { ButtonIconText } from "../../../../../Components/Buttons";

export default function AjouterReglement({
  setShowModalReglement,
  setFormData,
  montantDepenseTotal,
  selectedDepense = null,
}) {
  const [reglement, setReglement] = useState("");
  const [montant, setMontant] = useState("");
  const [numeroCheque, setNumeroCheque] = useState("");
  const [numeroCompte, setNumeroCompte] = useState("");
  const [tiersPayeur, setTiersPayeur] = useState("");
  const [showTiersPayeur, setShowTiersPayeur] = useState(false);
  const [showNonVersable, setShowNonVersable] = useState(false);
  const [showReferencesExternes, setShowReferencesExternes] = useState(false);
  const [invalidReglement, setInvalidReglement] = useState(false);
  const [invalidMontant, setInvalidMontant] = useState(false);

  useEffect(() => {
    if (selectedDepense) {
      setReglement(selectedDepense.reglement);
      setMontant(selectedDepense.montant);
      setNumeroCheque(selectedDepense.numeroCheque);
      setNumeroCompte(selectedDepense.numeroCompte);
      setTiersPayeur(selectedDepense.tiersPayeur);
      setShowTiersPayeur(Boolean(selectedDepense.tiersPayeur)); // Set to true if there is a tiers payeur
      setShowNonVersable(selectedDepense.nonVersable);
      setShowReferencesExternes(Boolean(selectedDepense.referencesExternes)); // Set to true if there are external references
    }
  }, [selectedDepense]);

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
      reglement: selectedDepense
        ? prevFormData.reglement.map((item) =>
            item.id === selectedDepense.id
              ? {
                  ...item,
                  reglement,
                  montant,
                  numeroCheque,
                  numeroCompte,
                  tiersPayeur,
                  nonVersable: showNonVersable,
                  referencesExternes: showReferencesExternes,
                }
              : item
          )
        : [
            ...prevFormData.reglement,
            {
              id: prevFormData.reglement.length + 1,
              reglement,
              montant,
              numeroCheque,
              numeroCompte,
              tiersPayeur,
              nonVersable: showNonVersable,
              referencesExternes: showReferencesExternes,
            },
          ],
    }));
    setShowModalReglement(false);
  };

  console.log(montantDepenseTotal);

  return (
    <section className="ajouter-reglement__container">
      <section className="ajouter-reglement__form">
        <article className="ajouter-reglement__header">
          <h3>
            {selectedDepense ? "Modifier un règlement" : "Ajouter un règlement"}
          </h3>
          <button type="button" onClick={() => setShowModalReglement(false)}>
            <img src={x} alt="Close" />
          </button>
        </article>
        <article className="ajouter-reglement__text-info">
          <div>
            <label htmlFor="reglement">Mode de règlement</label>
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
              <option value="003-Chèque">003-Chèque</option>
            </select>
          </div>
          <div>
            <label htmlFor="montant">Montant</label>
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
        {reglement === "003-Chèque" && (
          <article className="ajouter-reglement__cheque-infos">
            <div>
              <label htmlFor="numeroCheque">N° de chèque</label>
              <input
                type="text"
                id="numeroCheque"
                value={numeroCheque}
                onChange={(e) => setNumeroCheque(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="numeroCompte">N° de compte</label>
              <input
                type="text"
                id="numeroCompte"
                value={numeroCompte}
                onChange={(e) => setNumeroCompte(e.target.value)}
              />
            </div>
          </article>
        )}
        {reglement === "002-Espèce" && (
          <article className="ajouter-reglement__cheque-infos">
            <div>
              <label htmlFor="numeroCheque">Total</label>
              <input
                disabled
                type="text"
                id="numeroCheque"
                value={montantDepenseTotal + " €"}
                onChange={(e) => setNumeroCheque(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="numeroCompte">Rendu monnaie</label>
              <input
                disabled
                type="text"
                id="numeroCompte"
                value={
                  montant - montantDepenseTotal <= 0
                    ? "0 €"
                    : montant - montantDepenseTotal + " €"
                }
                onChange={(e) => setNumeroCompte(e.target.value)}
              />
            </div>
          </article>
        )}

        <section className="ajouter-reglement__parametre-container">
          <hr />
          <article className="ajouter-reglement__add-date">
            <div className="ajouter-reglement-label">
              <Switch setShow={setShowTiersPayeur} show={showTiersPayeur} />
              <p>Ajouter un tiers-payeur</p>
            </div>

            <div>
              {showTiersPayeur && (
                <input
                  type="text"
                  id="tiers-payeur"
                  value={tiersPayeur}
                  onChange={(e) => setTiersPayeur(e.target.value)}
                />
              )}
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
