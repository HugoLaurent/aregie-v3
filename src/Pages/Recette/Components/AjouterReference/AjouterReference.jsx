import "./ajouter-reference-styles.css";

export default function AjouterReference({
  formData,
  setFormData,
  lockButton,
}) {
  const handleReferenceChange = (e) => {
    const referenceValue = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      reference: referenceValue,
    }));
  };

  return (
    <section className="ajouter-reference__container">
      <h3>Référence</h3>
      <input
        disabled={lockButton}
        onChange={handleReferenceChange}
        value={formData?.reference}
        placeholder="Référence de la dépense (n° de facture, ticket, etc.)"
      />
    </section>
  );
}
