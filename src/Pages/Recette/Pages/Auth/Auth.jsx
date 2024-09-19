import "./auth-style.css";

import { useState } from "react";

import { ArregieLogo, WarningRedIcon } from "../../../../assets/images";
import InputTextNumber from "../../../../Components/Inputs/InputTextNumber";
import { ButtonIconText } from "../../../../Components/Buttons";
import {
  useValidateEmail,
  useValidatePassword,
  usePasswordCompromiseCheck,
} from "../../../../Hooks";
import { useDispatch } from "react-redux";
import { openPopup } from "../../../../redux/slices/components/popupSlice";
import { logUser } from "../../../../redux/slices/auth/authSlice";

export default function Auth() {
  const dispatch = useDispatch();
  const { checkPasswordCompromise } = usePasswordCompromiseCheck();
  const { validatePassword } = useValidatePassword();
  const { validateEmail } = useValidateEmail();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();

    console.log("Mot de passe :", password);
    console.log("Email :", email);

    // VALIDER L'EMAIL ET LE MOT DE PASSE
    if (!validateEmail(email) || !validatePassword(password)) return;

    // VÉRIFIER SI LE MOT DE PASSE A ÉTÉ COMPROMIS
    await checkPasswordCompromise(password);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 401) {
        dispatch(
          openPopup({
            title: "Erreur d'authentification",
            description: data.message,
            colorBorder: "red",
            icon: WarningRedIcon,
          })
        );
        return;
      }

      // Dispatch an action to update the Redux store with the authentication data
      dispatch(logUser());
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }

    // RÉINITIALISER LE CHAMP MOT DE PASSE
    // setPassword("");
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
              value={email || ""}
            />

            <InputTextNumber
              type="password"
              id="password"
              name="password"
              label={"Mot de passe"}
              onChange={(e) => setPassword(e.target.value)}
              value={password || ""}
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
