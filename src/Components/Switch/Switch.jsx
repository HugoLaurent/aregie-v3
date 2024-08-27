import "./switch-style.css";

export default function Switch({ setShow, show, commentaire }) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={commentaire ? true : show}
        onChange={() => setShow(!show)}
      />
      <span className="slider round"></span>
    </label>
  );
}
