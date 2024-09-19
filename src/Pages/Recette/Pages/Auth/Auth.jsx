import "./auth-style.css";

import { useState } from "react";

import { ArregieLogo } from "../../../../assets/images";
import InputTextNumber from "../../../../Components/Inputs/InputTextNumber";
import { ButtonIconText } from "../../../../Components/Buttons";
import { usePasswordCompromiseCheck } from "../../../../Hooks";

export default function Auth() {
  const { checkPasswordCompromise } = usePasswordCompromiseCheck();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    console.log("Email :", email);
    console.log("Mot de passe :", password);
    await checkPasswordCompromise(password);
  };

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
