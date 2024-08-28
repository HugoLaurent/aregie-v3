import { UserDarkIcon } from "../../../../assets/images";
import { ButtonIconText } from "../../../../Components/Buttons";
import "./tiers-payeur-style.css";

export default function TiersPayeur({ formData }) {
  const tiersPayeur = formData.reglement.map((item) => item.tiersPayeur);

  return (
    <section className="recette__tiers-payeur">
      <h3>Tiers payeur</h3>
      <article className="recette__tiers-payeur__items-container">
        {tiersPayeur.map((item, index) => (
          <ButtonIconText
            disabled={true}
            type={"button"}
            key={index}
            icon={UserDarkIcon}
            text={item}
            color={"rgba(255, 255, 255, 0.2)"}
          />
        ))}
      </article>
    </section>
  );
}
