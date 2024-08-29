import "./popup-style.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePopup } from "../../redux/slices/components/popupSlice";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "../../assets/images";

const Popup = () => {
  const dispatch = useDispatch();
  const { isOpen, popupProps } = useSelector((state) => state.popup);

  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        dispatch(closePopup());
      }, 5000);

      // Cleanup function to clear the timeout if the component unmounts or if isOpen changes
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, dispatch]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          initial={{ opacity: 0, transform: "translateX(100%)" }}
          animate={{ opacity: 1, transform: "translateX(0%)" }}
          exit={{ opacity: 0, transform: "translateX(100%)" }}
          transition={{ duration: 1 }}
          className="popup-container"
        >
          <div className="popup">
            <div className="popup-header">
              <img
                src={popupProps.icon}
                className="popup-header-icon"
                alt="Icon"
              />
            </div>
            <div className="popup-body">
              <div className="popup-header-title">{popupProps.title}</div>
              <div className="popup-body-description">
                {popupProps.description}
              </div>
            </div>
            <img
              src={CloseIcon}
              className="popup-header-close"
              style={{ color: popupProps.colorBorder }}
              onClick={() => dispatch(closePopup())}
              alt="Close Icon"
            />
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Popup;
