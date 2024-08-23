/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import "./main-modal-style.css";

export default function MainModal({ children, show }) {
  const modalVariants = {
    hidden: { opacity: 0, y: "-50%", x: "-50%" },
    visible: { opacity: 1, y: "-50%", x: "-50%" },
    exit: { opacity: 0, y: "-50%", x: "-50%" },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.section
          className="modale-container"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <motion.article className="modale-wrapper">{children}</motion.article>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
