import "./selectionner-tiers-style.css";

import { ButtonIconText } from "../../../../Components/Buttons/index";
import { userDark, remove, addUser } from "../../../../assets/images";

export default function SelectionnerTiers({
  searchResult,
  setSearchResult,
  showInput,
  setShowInput,
  numberOfResult,
  formData,
  setFormData,
  handleSearch,
  handleUserClick,
  lockButton,
}) {
  return (
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
          <div className="ajouter-recette__input-wrapper">
            <input
              disabled={lockButton}
              className="ajouter-recette__search-input"
              type="search"
              id="tiers-select"
              name="tiersSelect"
              onChange={handleSearch}
              value={formData.tiersSelect === "" ? "" : formData.tiers}
              placeholder="Rechercher un utilisateur..."
            />
            <button
              type="button"
              disabled={lockButton}
              className="ajouter-recette__add-user"
              onClick={() => {}}
            >
              <img src={addUser} alt="" />
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
              disabled={lockButton}
              type={"button"}
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
  );
}
