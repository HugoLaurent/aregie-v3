import "./ajouter-recette-style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

import { arrowBack, link, noteBlank } from "../../../../assets/images";

import userData from "../../../../assets/data/user.json";
import AjouterBudget from "./../../Components/Forms/AjouterBudget/AjouterBudget";
import MainModal from "../../../../Components/Modals/MainModal";
import AjouterReglement from "../../Components/Forms/AjouterReglement/AjouterReglement";

export default function AjouterRecette() {
  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const [numberOfResult, setNumberOfResult] = useState(null);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [showModalBudget, setShowModalBudget] = useState(false);
  const [showModalReglement, setShowModalReglement] = useState(false);
  const [montantDepenseTotal, setMontantDepenseTotal] = useState(0);
  const [montantReglementTotal, setMontantReglementTotal] = useState(0);
  const [selectedDepense, setSelectedDepense] = useState(null);

  const [formData, setFormData] = useState({
    tiers: "",
    reference: "",
    note: "",
    budget: [],
    reglement: [],
  });

  const handleSearch = (e) => {
    const search = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      tiers: search,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, id: Math.floor(Math.random() * 1000) });

    try {
      const response = await fetch(
        "http://localhost:3000/recette/create-recette",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      setFormData({
        tiers: "",
        reference: "",
        note: "",
        budget: [],
        reglement: [],
      });

      navigate("/recettes", {
        state: {
          showPopup: true,
          message: result.message,
        },
      });

      // Handle the response data here
    } catch (error) {
      console.error("Error:", error);
      // Handle any errors here
    }
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
            <button type="button" className="ajouter-recette__back-button">
              <img src={arrowBack} alt="Retour" />
            </button>
            <h2>Ajouter une recette</h2>
          </article>
          <article className="ajouter-recette__button-right">
            <ButtonIconText
              type={"button"}
              icon={link}
              text="Ajouter une référence"
              color={"#fff"}
              hoverColor={"rgba(128, 128, 128, 0.1)"}
              onClick={() => setShowReference(!showReference)}
            />
            <ButtonIconText
              type={"button"}
              icon={noteBlank}
              text="Ajouter une note"
              color={"#fff"}
              hoverColor={"rgba(128, 128, 128, 0.1)"}
              onClick={() => setShowNoteInput(!showNoteInput)}
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
            showModalBudget={showModalBudget}
            setShowModalBudget={setShowModalBudget}
            selectedDepense={selectedDepense}
            setSelectedDepense={setSelectedDepense}
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
          montantReglementTotal={montantReglementTotal}
          formData={formData}
        />
        <MainModal show={showModalBudget}>
          <AjouterBudget
            setShowModalBudget={setShowModalBudget}
            formData={formData}
            setFormData={setFormData}
            selectedDepense={selectedDepense}
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
