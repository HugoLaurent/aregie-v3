import "./main-modal-style.css";

export default function MainModal({ children, show }) {
  if (!show) return null;
  return (
    <section className="modale-container">
      <article className="modale-wrapper">{children}</article>
    </section>
  );
}
