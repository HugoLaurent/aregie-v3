import "./ajouter-recette-style.css";
import { motion } from "framer-motion";

import { ButtonIconText } from "./../../../../Components/Buttons/index";

import { arrowBack, link, check, noteBlank } from "./../../../../assets/images";
import { InputSelect } from "../../../../Components/Inputs";

export default function AjouterRecette() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="ag-theme-quartz ajouter-recette__container"
    >
      <form action="">
        <section className="ajouter-recette_header">
          <article className="ajouter-recette__title-icone">
            <button className="ajouter-recette__back-button">
              <img src={arrowBack} alt="" />
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
          <h3>Ajouter des tiers</h3>
          <select name="tiers" id="tiers-select">
            <option value="">--Please choose an option--</option>
            <option value="john doe">John Doe</option>
            <option value="jeanne dae">Jeanne Dae</option>
            <option value="mister francis">Mister Francis</option>
          </select>

          <img src="" alt="" />
        </article>
      </form>
    </motion.div>
  );
}
