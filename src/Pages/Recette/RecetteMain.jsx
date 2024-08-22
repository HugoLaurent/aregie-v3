import "./recette-style.css";

import { ButtonIconText } from "../../Components/Buttons";
import { add, search, print } from "../../assets/images";
import { ListRecette } from "../../Components";

export default function RecetteMain() {
  return (
    <section className="recette-container">
      <h2 className="recette-title">Liste des recettes</h2>
      <article className="recette__button-container">
        <ButtonIconText
          link="/recettes/ajouter-une-recette"
          icon={add}
          text="Ajouter une recette"
          color="#0081E3"
          textColor="#fff"
        />
        <div className="recette__button-container-right">
          <ButtonIconText
            icon={search}
            text="Rechercher"
            color="#fff"
            textColor="#000"
            hoverColor="rgba(128, 128, 128, 0.1)"
          />
          <ButtonIconText
            icon={print}
            text="Éditions"
            color="#fff"
            textColor="#000"
            hoverColor="rgba(128, 128, 128, 0.1)"
          />
        </div>
      </article>
      <ListRecette />
    </section>
  );
}
