import { useCallback } from "react";
import { useDispatch } from "react-redux"; // Utiliser ceci si vous utilisez Redux pour la gestion d'état
import { openPopup } from "../redux/slices/components/popupSlice";

const useOpenPopup = () => {
  const dispatch = useDispatch(); // Obtenir la fonction dispatch de Redux

  const handleOpenPopup = useCallback(
    ({ title, description, icon, colorBorder }) => {
      dispatch(
        openPopup({
          title,
          description,
          icon,
          colorBorder,
        })
      );
    },
    [dispatch]
  );

  return handleOpenPopup; // Retourner la fonction pour qu'elle puisse être utilisée ailleurs
};

export default useOpenPopup;
