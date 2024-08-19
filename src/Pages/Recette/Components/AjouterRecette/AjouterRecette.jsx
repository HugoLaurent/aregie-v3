import "./ajouter-recette-style.css";
import { useState } from "react";
import { motion } from "framer-motion";

import { ButtonIconText } from "./../../../../Components/Buttons/index";
import {
  arrowBack,
  link,
  check,
  noteBlank,
  userDark,
  remove,
  addUser,
} from "./../../../../assets/images";

import userData from "./../../../../assets/data/user.json";

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
        <article className="ajouter-recette__tier-container">
          <div className="ajouter-recette__tier-header">
            <h3>Sélectionner un tiers</h3>
            {numberOfResult > 0 && (
              <span className="tiers-list-results-number">
                {numberOfResult} autres résultats...
              </span>
            )}
          </div>
          <div className="ajouter-recette__search-container">
            {showInput && (
              <>
                <input
                  className="ajouter-recette__search-input"
                  type="search"
                  id="tiers-select"
                  name="tiersSelect"
                  onChange={handleSearch}
                  value={formData.tiersSelect}
                  placeholder="Rechercher un utilisateur..."
                />
                <button
                  className="ajouter-recette__add-user"
                  onClick={() => {}}
                >
                  <img src={addUser} alt="" />
                </button>
              </>
            )}
            <div className="tiers-list-results">
              {searchResult.length > 0 &&
                searchResult.map((user) => (
                  <ButtonIconText
                    key={user.id}
                    icon={userDark}
                    text={user.name}
                    color={"rgba(52, 164, 201, 0.3)"}
                    onClick={() => {
                      handleUserClick(user.name);
                    }}
                  />
                ))}

              {!showInput && (
                <button
                  className="tiers-delete-container"
                  alt="Icone d'utilisateur"
                  onClick={() => {
                    setSearchResult([]),
                      setShowInput(true),
                      setFormData({ tiersSelect: "" });
                  }}
                >
                  <img className="tiers-delete" src={remove} alt="" />
                </button>
              )}
            </div>
          </div>
        </article>
      </form>
    </motion.div>
  );
}
