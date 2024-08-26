import "./call-to-actions-style.css";

import { eye, print, x } from "../../../../assets/images";

export default function CallToActions({ data }) {
  console.log(data);

  return (
    <div className="call-to-actions__container">
      <button
        onClick={() => {
          console.log(data);
        }}
        className="cta-button"
      >
        <img src={eye} alt="" />
      </button>
      <button
        onClick={() => {
          console.log("Ajouter une rechjerce");
        }}
        className="cta-button"
      >
        <img src={print} alt="" />
      </button>
      <button
        onClick={() => {
          console.log("Ajouter une rechjerce");
        }}
        className="cta-button"
      >
        <img src={x} alt="" />
      </button>
    </div>
  );
}
