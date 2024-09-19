/**
 * @module useValidatePassword
 * @category Hooks
 * @description Hook to validate a password
 * @return {Object} { validatePassword }
 * @example
 * import { useValidatePassword } from "./Hooks";
 * const { validatePassword } = useValidatePassword();
 * validatePassword("password");
 * Output: openPopup
 *
 */

import { useDispatch } from "react-redux";

import { WarningRedIcon } from "../assets/images";
import { openPopup } from "../redux/slices/components/popupSlice";

const useValidatePassword = () => {
  const dispatch = useDispatch();

  const validatePassword = (password) => {
    try {
      if (password) {
        const regex =
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/;
        if (!regex.test(password)) {
          dispatch(
            openPopup({
              title: "Mot de passe invalide",
              description:
                "Le mot de passe doit contenir au moins 12 caractères, une majuscule, un chiffre, et un caractère spécial (@, #, $, %, &).",
              colorBorder: "red",
              icon: WarningRedIcon,
            })
          );
          return false;
        }
      } else {
        console.log("Mot de passe manquant");
        dispatch(
          openPopup({
            title: "Mot de passe manquant",
            description: "Veuillez saisir un mot de passe.",
            colorBorder: "red",
            icon: WarningRedIcon,
          })
        );
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du mot de passe :", error);
    }

    return true;
  };

  return { validatePassword };
};

export default useValidatePassword;
