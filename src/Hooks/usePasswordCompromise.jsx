/**
 *
 * @returns {Object} - Fonction pour vérifier si un mot de passe a été compromis
 * @example
 * const { checkPasswordCompromise } = usePasswordCompromiseCheck();
 * checkPasswordCompromise("password");
 * Output: Le mot de passe a été trouvé 123 fois dans des bases de données compromises.
 *
 */
import { useDispatch } from "react-redux";

import sha1 from "sha1";
import { WarningRedIcon } from "../assets/images";
import { openPopup } from "../redux/slices/components/popupSlice";

const usePasswordCompromiseCheck = () => {
  const dispatch = useDispatch();

  const checkPasswordCompromise = async (password) => {
    // Utiliser l'API Pwned Passwords qui demande sha1 pour vérifier si un mot de passe a été compromis
    const sha1Password = sha1(password).toUpperCase();

    // Envoyer les 5 premiers caractères du hash à l'API
    const prefix = sha1Password.substring(0, 5);
    const suffix = sha1Password.substring(5);
    const url = `https://api.pwnedpasswords.com/range/${prefix}`;

    try {
      const response = await fetch(url);
      const data = await response.text();

      const result = data
        .split("\n")
        .find((line) => line.split(":")[0] === suffix);

      if (result) {
        const count = parseInt(result.split(":")[1], 10);
        // Ouvrir le popup via Redux si le mot de passe a été compromis
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
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du mot de passe:", error);
    }

    return;
  };

  return { checkPasswordCompromise };
};

export default usePasswordCompromiseCheck;
