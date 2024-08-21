import "./ajouter-recette-style.css";
import { useState } from "react";
import { motion } from "framer-motion";

import { ButtonIconText } from "../../../../Components/Buttons/index";
import {
  AjouterTiers,
  BudgetRecette,
  ReglementRecette,
} from "./../../Components/index";

import { arrowBack, link, check, noteBlank } from "../../../../assets/images";

import userData from "../../../../assets/data/user.json";

export default function AjouterRecette() {
  const [searchResult, setSearchResult] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const [numberOfResult, setNumberOfResult] = useState(null);
  const [formData, setFormData] = useState({
    tiersSelect: "",
  });

  const handleSearch = (e) => {
    const search = e.target.value;
    setFormData({ ...formData, tiersSelect: search });

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

    // Log formData for debugging
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
      className="ag-theme-quartz ajouter-recette__container"
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
            />
            <ButtonIconText
              icon={noteBlank}
              text="Ajouter une note"
              color={"#fff"}
              hoverColor={"rgba(128, 128, 128, 0.1)"}
            />
            <ButtonIconText
              icon={check}
              text="Valider"
              color={"rgba(107, 114, 128, 0.3)"}
              textColor={"#fff"}
            />
          </article>
        </section>
        <AjouterTiers
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
        <section className="ajouter-recette__budget-depense-container">
          <BudgetRecette formData={formData} setFormData={setFormData} />
          <ReglementRecette formData={formData} setFormData={setFormData} />
        </section>
      </form>
    </motion.div>
  );
}
