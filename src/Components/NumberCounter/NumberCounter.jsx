/* eslint-disable react/prop-types */
import "./number-counter-style.css";
import { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";

export default function NumberCounter({
  from,
  to,
  duration,
  setActualMontant,
}) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      onUpdate: (value) => {
        setCount(Math.round(value));
        setActualMontant(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [from, to, duration, setActualMontant]);

  return (
    <motion.div>
      <motion.p>{count} €</motion.p>
    </motion.div>
  );
}
