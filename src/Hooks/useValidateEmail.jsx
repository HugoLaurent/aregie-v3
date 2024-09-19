/**
 * @module useValidateEmail
 * @category Hooks
 * @description Hook to validate an email
 * @return {Object} { validateEmail }
 * @example
 * import { useValidateEmail } from "./Hooks";
 * const { validateEmail } = useValidateEmail();
 * validateEmail("email");
 * Output: openPopup
 *
 */

import { useDispatch } from "react-redux";

import { WarningRedIcon } from "../assets/images";
import { openPopup } from "../redux/slices/components/popupSlice";

const useValidateEmail = () => {
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    console.log("Email du hooks :", email);

    try {
      if (email) {
        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
          dispatch(
            openPopup({
              title: "Email invalide",
              description: "Veuillez saisir un email valide.",
              colorBorder: "red",
              icon: WarningRedIcon,
            })
          );
          return false;
        }
      } else {
        dispatch(
          openPopup({
            title: "Email manquant",
            description: "Veuillez saisir un email.",
            colorBorder: "red",
            icon: WarningRedIcon,
          })
        );
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email :", error);
    }

    return true;
  };

  return { validateEmail };
};

export default useValidateEmail;
