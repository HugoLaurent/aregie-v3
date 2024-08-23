import "./popup-style.css";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { x } from "../../assets/images";

export default function Popup({
  icon,
  title,
  description,
  colorBorder,
  showPopup,
  setShowPopup,
}) {
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000); // Set the popup to disappear after 5 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount or when showPopup changes
    }
  }, [showPopup, setShowPopup]);

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.section
          initial={{ opacity: 0, transform: "translateX(100%)" }}
          animate={{ opacity: 1, transform: "translateX(0%)" }}
          exit={{ opacity: 0, transform: "translateX(100%)" }}
          transition={{ duration: 1 }}
          className="popup-container"
        >
          <div className="popup">
            <div className="popup-header">
              <img src={icon} className="popup-header-icon" alt="Icon" />
            </div>
            <div className="popup-body">
              <div className="popup-header-title">{title}</div>
              <div className="popup-body-description">{description}</div>
            </div>
            <img
              src={x}
              className="popup-header-close"
              style={{ color: colorBorder }}
              onClick={() => setShowPopup(false)}
              alt="Close Icon"
            />
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
