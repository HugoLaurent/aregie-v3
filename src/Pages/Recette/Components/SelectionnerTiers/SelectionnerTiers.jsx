import "./selectionner-tiers-style.css";

import userData from "../../../../assets/data/user.json";

import { useState, useEffect } from "react";

import { ButtonIconText } from "../../../../Components/Buttons/index";
import {
  UserDarkIcon,
  RemoveIcon,
  AddUserIcon,
} from "../../../../assets/images";

export default function SelectionnerTiers({
  formData,
  setFormData,
  lockButton,
}) {
  const [showInput, setShowInput] = useState(true);
  const [numberOfResult, setNumberOfResult] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  console.log(formData.tiers);

  useEffect(() => {
    if (formData.tiers) {
      setShowInput(false);

      setSearchResult(formData.tiers ? [formData.tiers] : []);
    } else {
      setShowInput(true);
      setSearchResult([]);
    }
  }, [formData.tiers]);

  const handleSearch = (e) => {
    const search = e.target.value;

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

  const handleUserClick = (userName) => {
    setSearchResult([userData.find((user) => user.name === userName)]);
    setNumberOfResult(null);
    setShowInput(false);
    setFormData((prevFormData) => ({ ...prevFormData, tiers: userName }));
  };

  const handleReset = () => {
    setSearchResult([]);
    setShowInput(true);
    setFormData((prevFormData) => ({ ...prevFormData, tiers: "" }));
  };

  return (
    <article className="ajouter-recette__tier-container">
      <div className="ajouter-recette__tier-header">
        <h3>Tiers</h3>
        {numberOfResult > 0 && (
          <span className="tiers-list-results-number">
            {numberOfResult} autres résultats...
          </span>
        )}
      </div>
      <div className="ajouter-recette__search-container">
        {showInput && (
          <div className="ajouter-recette__input-wrapper">
            <input
              disabled={lockButton}
              className="ajouter-recette__search-input"
              type="search"
              id="tiers-select"
              name="tiersSelect"
              onChange={handleSearch}
              placeholder="Rechercher un tiers..."
            />
            <button
              type="button"
              disabled={lockButton}
              className="ajouter-recette__add-user"
              onClick={() => {}}
            >
              <img src={AddUserIcon} alt="" />
            </button>
          </div>
        )}
        <div className="tiers-list-results">
          {searchResult?.length > 0 &&
            searchResult.map((user) => (
              <ButtonIconText
                disabled={lockButton}
                type={"button"}
                key={user.id}
                icon={UserDarkIcon}
                text={formData.tiers ? formData.tiers : user.name}
                color={"rgba(52, 164, 201, 0.3)"}
                onClick={() => {
                  handleUserClick(user.name);
                }}
              />
            ))}

          {!showInput && (
            <div className="selected-tier">
              {!lockButton && (
                <button
                  disabled={lockButton}
                  type={"button"}
                  className="tiers-delete-container"
                  alt="Icone d'utilisateur"
                  onClick={handleReset}
                >
                  <img className="tiers-delete" src={RemoveIcon} alt="" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
