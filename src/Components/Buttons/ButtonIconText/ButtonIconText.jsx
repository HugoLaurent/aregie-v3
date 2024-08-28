import { Link } from "react-router-dom";
import "./button-text-icon-style.css";

export default function ButtonIconText({
  onClick,
  icon,
  alt,
  text,
  color,
  LinkIcon,
  textColor,
  type,
  disabled,
  hoverColor,
}) {
  // Crée un objet pour les styles en ligne
  const buttonStyle = {
    backgroundColor: color || "transparent",
    color: textColor || "inherit",
    "--hover-color": hoverColor || "rgba(255, 255, 255, 0.2)", // Utilise la prop hoverColor
  };

  // Détermine le composant à utiliser
  const Component = LinkIcon ? Link : "button";

  return (
    <Component
      disabled={disabled}
      to={LinkIcon}
      onClick={onClick}
      className="button-icon-text-container"
      style={buttonStyle}
      type={type}
    >
      <img src={icon} alt={alt} className="icon" />
      <span>{text}</span>
    </Component>
  );
}
