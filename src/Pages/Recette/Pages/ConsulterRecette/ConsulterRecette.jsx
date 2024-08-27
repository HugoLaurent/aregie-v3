import "./consulter-recette-style.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { openPopup } from "../../../../redux/reducers/popupReducer";
import { useNavigate } from "react-router-dom";

import userData from "./../../../../assets/data/user.json";

import {
  AjouterNote,
  AjouterReference,
  BudgetRecette,
  ReglementRecette,
  ResumeRecette,
  SelectionnerTiers,
  AjouterReglement,
  AjouterBudget,
} from "./../../Components";
import { ButtonIconText } from "../../../../Components/Buttons";
import MainModal from "../../../../Components/Modals/MainModal";
import {
  arrowBack,
  greenCheck,
  link,
  noteBlank,
} from "../../../../assets/images";

export default function ConsulterRecette() {
  const { id } = useParams();

  const [searchResult, setSearchResult] = useState([]);
  const [showInput, setShowInput] = useState(true);

  const [showNoteInput, setShowNoteInput] = useState(true);
  const [numberOfResult, setNumberOfResult] = useState(null);
  const [showReference, setShowReference] = useState(true);
  const [showModalBudget, setShowModalBudget] = useState(false);
  const [showModalReglement, setShowModalReglement] = useState(false);
  const [montantDepenseTotal, setMontantDepenseTotal] = useState(0);
  const [montantReglementTotal, setMontantReglementTotal] = useState(0);
  const [selectedDepense, setSelectedDepense] = useState(null);
  const [lockButton, setLockButton] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const handleOpenPopup = () => {
      dispatch(
        openPopup({
          title: "Recette ajoutée avec succès",
          description: `La recette a été ajoutée avec succès pour le tiers ${formData.tiersSelect}`,
          icon: greenCheck,
          colorBorder: "green",
        })
      );
    };
    setFormData({ ...formData, id: Math.floor(Math.random() * 1000) });

    try {
      const response = await fetch("http://localhost:3000/recette/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      setFormData({
        tiers: "",
        reference: "",
        note: "",
        budget: [],
        reglement: [],
      });

      if (result) {
        handleOpenPopup();
        navigate("/recettes");
      }

      // Handle the response data here
    } catch (error) {
      console.error("Error:", error);
      // Handle any errors here
    }
  };

  const handleUserClick = (userName) => {
    setSearchResult([userData.find((user) => user.name === userName)]);
    setNumberOfResult(null);
    setShowInput(false);
    setFormData({ ...formData, tiersSelect: userName });
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      tiers: search,
    }));
    if (search === "") {
      setSearchResult([]);
      setNumberOfResult(null);
    } else {
      const result = userData.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setNumberOfResult(result.length - 4);
      setSearchResult(result.slice(0, 4));
    }
  };

  const [formData, setFormData] = useState({
    tiers: "",
    reference: "",
    note: "",
    budget: [],
    reglement: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/recette/${id}`);
        const data = await response.json();

        const { tiers, reference, note, budget, reglement } = data;
        setFormData({
          tiers,
          reference,
          note,
          budget,
          reglement,
        });
        console.log(formData);
      } catch (error) {
        console.error("Erreur lors du fetch:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="ajouter-recette__container"
    >
      <form onSubmit={handleSubmit}>
        <section className="ajouter-recette_header">
          <article className="ajouter-recette__title-icone">
            <button type="button" className="ajouter-recette__back-button">
              <img src={arrowBack} alt="Retour" />
            </button>
            <h2>Recette n°{id}</h2>
          </article>
          <article className="ajouter-recette__button-right">
            <ButtonIconText
              type={"button"}
              icon={link}
              text="Voir les statuts"
              color={"#fff"}
              hoverColor={"rgba(128, 128, 128, 0.1)"}
              onClick={() => {}}
            />
            <ButtonIconText
              type={"button"}
              icon={noteBlank}
              text="Voir les pièces jointes"
              color={"#fff"}
              hoverColor={"rgba(128, 128, 128, 0.1)"}
              onClick={() => {}}
            />
            <ButtonIconText
              type={"button"}
              icon={noteBlank}
              text="Modifier"
              textColor={"white"}
              color={"rgba(0, 129, 227, 1)"}
              hoverColor={"rgba(0, 129, 227, 0.1)"}
              onClick={() => setLockButton(!lockButton)}
            />
          </article>
        </section>
        <section className="ajouter-recette__tiers-note-container">
          {showReference && (
            <AjouterReference setFormData={setFormData} formData={formData} />
          )}
          <SelectionnerTiers
            handleUserClick={handleUserClick}
            handleSearch={handleSearch}
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            showInput={showInput}
            setShowInput={setShowInput}
            numberOfResult={numberOfResult}
            formData={formData}
            setFormData={setFormData}
            lockButton={lockButton}
          />
          {showNoteInput && (
            <AjouterNote setFormData={setFormData} formData={formData} />
          )}
        </section>
        <section className="ajouter-recette__budget-depense-container">
          <BudgetRecette
            formData={formData}
            setFormData={setFormData}
            showModalBudget={true}
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
            showModalReglement={true}
            setShowModalReglement={setShowModalReglement}
            montantReglementTotal={montantReglementTotal}
            setMontantReglementTotal={setMontantReglementTotal}
            lockButton={lockButton}
          />
        </section>
        {!lockButton && (
          <>
            <ResumeRecette
              montantDepenseTotal={montantDepenseTotal}
              montantReglementTotal={montantReglementTotal}
              formData={formData}
            />
            <MainModal show={showModalBudget}>
              <AjouterBudget
                setShowModalBudget={setShowModalBudget}
                formData={formData}
                setFormData={setFormData}
                selectedDepense={selectedDepense}
              />
            </MainModal>
            <MainModal show={showModalReglement}>
              <AjouterReglement
                setShowModalReglement={setShowModalReglement}
                formData={formData}
                setFormData={setFormData}
              />
            </MainModal>
          </>
        )}
      </form>
    </motion.div>
  );
}
