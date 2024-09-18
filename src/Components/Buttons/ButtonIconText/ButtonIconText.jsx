import { Link } from "react-router-dom";
import "./button-text-icon-style.css";

export default function ButtonIconText({
  onClick,
  icon,
  alt,
  text,
  color,
  link,
  textColor,
  type,
  disabled,
  hoverColor,
  noFlex,
}) {
  // Crée un objet pour les styles en ligne
  const buttonStyle = {
    backgroundColor: color || "transparent",
    color: textColor || "inherit",
    "--hover-color": hoverColor || "rgba(255, 255, 255, 0.2)",
    display: noFlex ? "block" : "flex",
  };

  // Détermine le composant à utiliser
  const Component = link ? Link : "button";

  return (
    <Component
      disabled={disabled}
      to={link}
      onClick={onClick}
      className="button-icon-text-container"
      style={buttonStyle}
      type={type}
    >
      {icon && <img src={icon} alt={alt} className="icon" />}
      <span>{text}</span>
    </Component>
  );
}
