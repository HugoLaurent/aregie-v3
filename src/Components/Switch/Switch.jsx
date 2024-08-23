import "./switch-style.css";

export default function Switch({ setShow, show }) {
  return (
    <label className="switch">
      <input type="checkbox" onChange={() => setShow(!show)} />
      <span className="slider round"></span>
    </label>
  );
}
