import "./auth-style.css";

import { useState } from "react";
import sha1 from "sha1";

import { ArregieLogo, WarningRedIcon } from "../../../../assets/images";
import InputTextNumber from "../../../../Components/Inputs/InputTextNumber";
import { ButtonIconText } from "../../../../Components/Buttons";
import { useDispatch } from "react-redux";
import { openPopup } from "../../../../redux/slices/components/popupSlice";

export default function Auth() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = (e) => {
    e.preventDefault();
    console.log("Email :", email);
    console.log("Mot de passe :", password);
    checkPasswordCompromise(password);
  };

  async function checkPasswordCompromise(password) {
    // 1. Hasher le mot de passe en SHA-1
    const sha1Password = sha1(password).toUpperCase();

    // 2. Envoyer les 5 premiers caractères du hash à l'API
    const prefix = sha1Password.substring(0, 5);
    const suffix = sha1Password.substring(5);
    const url = `https://api.pwnedpasswords.com/range/${prefix}`;

    try {
      const response = await fetch(url);
      const data = await response.text();

      // 3. Chercher le suffix correspondant dans la réponse
      const result = data
        .split("\n")
        .find((line) => line.split(":")[0] === suffix);

      if (result) {
        const count = parseInt(result.split(":")[1], 10);
        dispatch(
          openPopup({
            title: "Mot de passe compromis",
            description: `Le mot de passe a été trouvé ${count} fois dans des bases de données compromises.`,
            icon: WarningRedIcon,
            colorBorder: "red",
          })
        );
        console.log(
          `Le mot de passe a été trouvé ${count} fois dans des bases de données compromises.`
        );
        return count;
      } else {
        console.log("Le mot de passe est sécurisé.");
        return 0;
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du mot de passe :", error);
      return 0;
    }
  }

  return (
    <section className="auth-container">
      <article className="auth-left__wrapper">
        <img src={ArregieLogo} alt="" />
      </article>
      <article className="auth-right__wrapper">
        <h1>Bienvenue chez Aregie</h1>
        <p>
          Connectez-vous pour accéder à votre espace personnel et gérer vos
          recettes.
        </p>
        <form className="auth-form">
          <div className="form-group">
            <InputTextNumber
              type="email"
              id="email"
              name="email"
              label={"Email"}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputTextNumber
              type="password"
              id="password"
              name="password"
              label={"Mot de passe"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>
              Veuillez saisir un mot de passe d&apos;au moins 12 caractères,
              incluant des chiffres, une majuscule et un caractère spécial
              (comme @, #, $, %, &).
            </span>
          </div>
          <ButtonIconText
            text="Se connecter"
            color="rgba(0, 129, 227, 1)"
            textColor="white"
            noFlex={true}
            onClick={handleAuth}
          />
        </form>
        <a>J&apos;ai oublié mon mot de passe.</a>
      </article>
    </section>
  );
}
