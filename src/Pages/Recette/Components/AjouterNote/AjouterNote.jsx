/* eslint-disable react/prop-types */
import "./ajouter-note.css";

export default function AjouterNote({ setFormData }) {
  const handleNoteChange = (e) => {
    const noteValue = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      note: noteValue,
    }));
  };

  return (
    <section className="note-container">
      <textarea
        onChange={handleNoteChange}
        placeholder="Note de la dépense (n° de facture, ticket, etc.)"
      />
    </section>
  );
}
