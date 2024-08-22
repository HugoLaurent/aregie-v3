import "./resume-recette-style.css";

import { warningCircle } from "../../../../assets/images";
import { ButtonIconText } from "../../../../Components/Buttons";

export default function ResumeRecette() {
  return (
    <section className="resume-recette__container">
      <article>
        <h3>Résumé de la recette</h3>
        <section>
          <article>
            <img src="" alt="" />
            <p>Votre budget est supérieur à la somme des règlements.</p>
          </article>
          <article>
            <p>Reste à régler</p>
            <p>10,00€</p>
          </article>
        </section>
      </article>
      <article>
        <ButtonIconText
          icon={warningCircle}
          text="Valider"
          color="rgba(255, 165, 0, 1)"
          hoverColor=""
          textColor="white"
        />
      </article>
    </section>
  );
}
