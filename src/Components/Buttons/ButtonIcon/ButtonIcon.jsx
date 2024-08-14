import "./button-icon-style.css";

// eslint-disable-next-line react/prop-types
export default function ButtonIcon({ onClick, icon, alt }) {
  return (
    <button onClick={onClick} className="button-icon-container">
      <img src={icon} alt={alt} className="icon" />
    </button>
  );
}
