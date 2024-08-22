import "./ajouter-recette-style.css";
import { useState } from "react";
import { motion } from "framer-motion";

import { ButtonIconText } from "../../../../Components/Buttons";
import {
  AjouterNote,
  AjouterReference,
  BudgetRecette,
  ReglementRecette,
  ResumeRecette,
  SelectionnerTiers,
} from "./../../Components";

import { arrowBack, link, check, noteBlank } from "../../../../assets/images";

import userData from "../../../../assets/data/user.json";
import AjouterBudget from "./../../Components/Forms/AjouterBudget/AjouterBudget";
import MainModal from "../../../../Components/Modals/MainModal";
import AjouterReglement from "../../Components/Forms/AjouterReglement/AjouterReglement";

export default function AjouterRecette() {
  const [searchResult, setSearchResult] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const [numberOfResult, setNumberOfResult] = useState(null);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [showModalBudget, setShowModalBudget] = useState(false);
  const [showModalReglement, setShowModalReglement] = useState(false);
  const [montantDepenseTotal, setMontantDepenseTotal] = useState(0);
  const [montantReglementTotal, setMontantReglementTotal] = useState(0);

  const checkEquality = (montantDepenseTotal, montantReglementTotal) => {
    if (montantDepenseTotal !== montantReglementTotal) {
      return false;
    } else {
      return true;
    }
  };

  const [formData, setFormData] = useState({
    tiersSelect: "",
    reference: "",
    note: "",
    depenseBudget: [],
    depenseReglement: [],
  });

  const handleSearch = (e) => {
    const search = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      tiersSelect: search,
    }));
    if (search === "") {
      setSearchResult([]);
      setNumberOfResult(null);
    } else {
      const result = userData.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setNumberOfResult(result.length - 4);
      setSearchResult(result.slice(0, 4));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);
  };

  const handleUserClick = (userName) => {
    setSearchResult([userData.find((user) => user.name === userName)]);
    setNumberOfResult(null);
    setShowInput(false);
    setFormData({ ...formData, tiersSelect: userName });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="ajouter-recette__container"
    >
      <form onSubmit={handleSubmit}>
        <section className="ajouter-recette_header">
          <article className="ajouter-recette__title-icone">
            <button className="ajouter-recette__back-button">
              <img src={arrowBack} alt="Retour" />
            </button>
            <h2>Ajouter une recette</h2>
          </article>
          <article className="ajouter-recette__button-right">
            <ButtonIconText
              icon={link}
              text="Ajouter une référence"
              color={"#fff"}
              hoverColor={"rgba(128, 128, 128, 0.1)"}
              onClick={() => setShowReference(!showReference)}
            />
            <ButtonIconText
              icon={noteBlank}
              text="Ajouter une note"
              color={"#fff"}
              hoverColor={"rgba(128, 128, 128, 0.1)"}
              onClick={() => setShowNoteInput(!showNoteInput)}
            />
            <ButtonIconText
              icon={check}
              text="Valider"
              color={"rgba(107, 114, 128, 0.3)"}
              textColor={"#fff"}
            />
          </article>
        </section>
        <section className="ajouter-recette__tiers-note-container">
          {showReference && <AjouterReference setFormData={setFormData} />}
          <SelectionnerTiers
            handleUserClick={handleUserClick}
            handleSearch={handleSearch}
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            showInput={showInput}
            setShowInput={setShowInput}
            numberOfResult={numberOfResult}
            formData={formData}
            setFormData={setFormData}
          />
          {showNoteInput && <AjouterNote setFormData={setFormData} />}
        </section>
        <section className="ajouter-recette__budget-depense-container">
          <BudgetRecette
            formData={formData}
            setFormData={setFormData}
            setShowModalBudget={setShowModalBudget}
            montantDepenseTotal={montantDepenseTotal}
            setMontantDepenseTotal={setMontantDepenseTotal}
          />
          <ReglementRecette
            formData={formData}
            setFormData={setFormData}
            setShowModalReglement={setShowModalReglement}
            montantReglementTotal={montantReglementTotal}
            setMontantReglementTotal={setMontantReglementTotal}
          />
        </section>
        <ResumeRecette
          montantDepenseTotal={montantDepenseTotal}
          checkEquality={checkEquality}
        />
        <MainModal show={showModalBudget}>
          <AjouterBudget
            setShowModalBudget={setShowModalBudget}
            formData={formData}
            setFormData={setFormData}
          />
        </MainModal>
        <MainModal show={showModalReglement}>
          <AjouterReglement
            setShowModalReglement={setShowModalReglement}
            formData={formData}
            setFormData={setFormData}
          />
        </MainModal>
      </form>
    </motion.div>
  );
}
