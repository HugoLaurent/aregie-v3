import "./ajouter-recette-style.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecettes,
  createRecette,
  updateRecette,
} from "../../../../redux/slices/recettes/recetteSlice";
import {
  AjouterNote,
  AjouterReference,
  BudgetRecette,
  ReglementRecette,
  SelectionnerTiers,
  AjouterReglement,
  AjouterBudget,
  ResumeRecette,
  TiersPayeur,
} from "../../Components";
import { ButtonIconText } from "../../../../Components/Buttons";
import MainModal from "../../../../Components/Modals/MainModal";
import {
  ArrowBackIcon,
  ClockBackwardIcon,
  GreenCheckIcon,
  LinkIcon,
  NoteBlankIcon,
  PaperclipIcon,
  EditWhiteIcon,
  WarningRedIcon,
} from "../../../../assets/images";
import { CreerTiers } from "../../../../Components";
import { useOpenPopup } from "../../../../Hooks";

export default function RecetteForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openPopup = useOpenPopup();

  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [showModalBudget, setShowModalBudget] = useState(false);
  const [showModalReglement, setShowModalReglement] = useState(false);
  const [montantDepenseTotal, setMontantDepenseTotal] = useState(0);
  const [montantReglementTotal, setMontantReglementTotal] = useState(0);
  const [selectedDepense, setSelectedDepense] = useState(null);
  const [lockButton, setLockButton] = useState(isEditMode);

  const [showReference, setShowReference] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(false);

  const recettes = useSelector((state) => state.recettes.data);

  useEffect(() => {
    dispatch(fetchRecettes());
    const findRecette = (recettes) => {
      return recettes.find((recette) => recette.id === +id);
    };

    setSelectedDepense(findRecette(recettes));
  }, [dispatch, id]);

  const [formData, setFormData] = useState({
    tiers: "",
    reference: "",
    note: "",
    budgets: [],
    reglements: [],
  });

  useEffect(() => {
    isEditMode &&
      recettes.forEach((recette) => {
        if (recette.id === +id) {
          setFormData({
            tiers: recette.tiers,
            reference: recette.reference,
            note: recette.note,
            budgets: recette.budgets,
            reglements: recette.reglements,
          });
        }
      });
    formData.reference && setShowReference(true);
    formData.note && setShowNoteInput(true);
  }, [recettes, id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode) {
      dispatch(updateRecette({ id, formData }))
        .unwrap()
        .then(() => {
          openPopup({
            title: "Recette modifiée",
            description: "La recette a bien été modifiée",
            icon: GreenCheckIcon,
            colorBorder: "green",
          });
          dispatch(fetchRecettes());
          navigate("/recettes");
        })
        .catch((error) => console.error("Error:", error));
    } else {
      dispatch(createRecette(formData))
        .unwrap()
        .then(() => {
          openPopup({
            title: "Recette ajoutée",
            description: "La recette a bien été ajoutée",
            icon: GreenCheckIcon,
            colorBorder: "green",
          });
          dispatch(fetchRecettes());
          navigate("/recettes");
        })
        .catch((error) => {
          console.error("Error:", error),
            openPopup({
              title: "Erreur",
              icon: WarningRedIcon,
              description:
                "Une erreur est survenue lors de l'ajout de la recette",
              colorBorder: "red",
            });
        });
    }
  };

  const titleToReturn = () => {
    if (isEditMode) {
      if (!lockButton) {
        return `Modifier recette n°${id}`;
      } else {
        return `Recette n°${id}`;
      }
    } else if (!id) {
      return "Ajouter une recette";
    }
  };

  console.log("formData", formData);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="recette__container"
    >
      <form onSubmit={handleSubmit}>
        <section className="recette_header">
          <article className="recette__title-icone">
            <button
              type="button"
              className="recette__back-button"
              onClick={() => navigate(-1)}
            >
              <img src={ArrowBackIcon} alt="Retour" />
            </button>
            <h2>{titleToReturn()}</h2>
          </article>
          <article className="recette__button-right">
            {lockButton && (
              <>
                <ButtonIconText
                  type={"button"}
                  icon={ClockBackwardIcon}
                  text="Voir les statuts"
                  color={"#fff"}
                  hoverColor={"rgba(128, 128, 128, 0.1)"}
                  onClick={() => {}}
                />
                <ButtonIconText
                  type={"button"}
                  icon={PaperclipIcon}
                  text="Voir les pièces jointes"
                  color={"#fff"}
                  hoverColor={"rgba(128, 128, 128, 0.1)"}
                  onClick={() => {}}
                />
                <ButtonIconText
                  type={"button"}
                  icon={EditWhiteIcon}
                  text="Modifier"
                  textColor={"white"}
                  color={"rgba(0, 129, 227, 1)"}
                  hoverColor={"rgba(0, 129, 227, 0.1)"}
                  onClick={() => setLockButton(!lockButton)}
                />
              </>
            )}
            {!lockButton && (
              <>
                <ButtonIconText
                  type={"button"}
                  icon={LinkIcon}
                  text="Ajouter une référence"
                  color={"#fff"}
                  hoverColor={"rgba(128, 128, 128, 0.1)"}
                  onClick={() => setShowReference(!showReference)}
                />
                <ButtonIconText
                  type={"button"}
                  icon={NoteBlankIcon}
                  text="Ajouter une note"
                  color={"#fff"}
                  hoverColor={"rgba(128, 128, 128, 0.1)"}
                  onClick={() => setShowNoteInput(!showNoteInput)}
                />
                <ButtonIconText
                  type={"button"}
                  icon={lockButton ? EditWhiteIcon : ArrowBackIcon}
                  text={lockButton ? "Modifier" : "Annuler"}
                  textColor={"white"}
                  color={"rgba(0, 129, 227, 1)"}
                  hoverColor={"rgba(0, 129, 227, 0.1)"}
                  onClick={() =>
                    location === "ajouter-une-recette"
                      ? navigate(-1)
                      : setLockButton(!lockButton)
                  }
                />
              </>
            )}
          </article>
        </section>
        <section className="recette__tiers-note-container">
          {showReference && (
            <AjouterReference
              lockButton={lockButton}
              setFormData={setFormData}
              formData={formData}
            />
          )}
          <SelectionnerTiers
            formData={formData}
            setFormData={setFormData}
            lockButton={lockButton}
          />
          {formData.reglements?.some((item) => item.tiersPayeur) && (
            <TiersPayeur formData={formData} />
          )}
          {showNoteInput && (
            <AjouterNote
              setFormData={setFormData}
              formData={formData}
              lockButton={lockButton}
            />
          )}
        </section>
        <section className="recette__budget-depense-container">
          <BudgetRecette
            formData={formData}
            setFormData={setFormData}
            showModalBudget={showModalBudget}
            setShowModalBudget={setShowModalBudget}
            selectedDepense={selectedDepense}
            setSelectedDepense={setSelectedDepense}
            montantDepenseTotal={montantDepenseTotal}
            setMontantDepenseTotal={setMontantDepenseTotal}
            lockButton={lockButton}
          />
          <ReglementRecette
            formData={formData}
            setFormData={setFormData}
            showModalReglement={showModalReglement}
            setSelectedDepense={setSelectedDepense}
            setShowModalReglement={setShowModalReglement}
            montantReglementTotal={montantReglementTotal}
            setMontantReglementTotal={setMontantReglementTotal}
            lockButton={lockButton}
          />
        </section>
        {!lockButton && (
          <ResumeRecette
            montantDepenseTotal={montantDepenseTotal}
            montantReglementTotal={montantReglementTotal}
            formData={formData}
          />
        )}
        <MainModal show={showModalBudget}>
          <AjouterBudget
            setShowModalBudget={setShowModalBudget}
            formData={formData}
            setFormData={setFormData}
            selectedDepense={selectedDepense}
            lockButton={lockButton}
          />
        </MainModal>
        <MainModal show={showModalReglement}>
          <AjouterReglement
            setShowModalReglement={setShowModalReglement}
            montantDepenseTotal={montantDepenseTotal}
            formData={formData}
            setFormData={setFormData}
            selectedDepense={selectedDepense}
            lockButton={lockButton}
          />
        </MainModal>
        <MainModal show={false}>
          <CreerTiers />
        </MainModal>
      </form>
    </motion.div>
  );
}
