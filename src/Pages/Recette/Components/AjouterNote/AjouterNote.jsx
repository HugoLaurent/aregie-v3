import "./ajouter-note.css";

export default function AjouterNote({ formData, setFormData, lockButton }) {
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
        disabled={lockButton}
        onChange={handleNoteChange}
        value={formData?.note}
        placeholder="Note de la dépense (n° de facture, ticket, etc.)"
      />
    </section>
  );
}
