import "./creer-tiers-style.css";
import Switch from "../Switch/Switch";
import { CheckIcon } from "../../assets/images";
import { ButtonIconText } from "../Buttons";

export default function CreerTiers() {
  return (
    <section className="creer-tiers__container">
      <form action="" className="creer-tiers__form">
        <article className="creer-tiers__header">
          <h2>Ajouter un tiers</h2>
        </article>
        <article>
          <select name="" id="">
            <option value="Monsieur">Monsieur</option>
            <option value="Madame">Madame</option>
            <option value="Non commmuniqué">Non commmuniqué</option>
          </select>
          <input type="text" placeholder="Prénom" />
          <input type="text" placeholder="Nom" />
        </article>
        <article>
          <Switch />
          <input type="text" placeholder="Adresse" />
          <input type="text" placeholder="Code postal" />
          <input type="text" placeholder="Ville" />
        </article>
        <article>
          <Switch />
          <input type="text" placeholder="Téléphone" />
          <input type="text" placeholder="Email" />
        </article>
        <article className="creer-tiers__footer">
          <ButtonIconText type="button" text="Annuler" onClick={() => {}} />
          <ButtonIconText
            type="button"
            icon={CheckIcon}
            text="Valider"
            color="#00A7DC"
            textColor="#fff"
            onClick={() => {}}
          />
        </article>
      </form>
    </section>
  );
}
