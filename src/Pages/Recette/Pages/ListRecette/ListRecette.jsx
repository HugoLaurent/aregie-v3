// Children component of List.jsx
import "./list-recette-style.css";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import { AG_GRID_LOCALE_FR } from "@ag-grid-community/locale";

import { Popup } from "../../../../Components/index";
import { greenCheck, logoBande } from "../../../../assets/images";
import { CallToActions } from "../../Components";

export const ListRecette = () => {
  // On récupère les données de la location envoyé par le composant enfant au moment de la redirection au vu du succès de la creation d'une recette
  const location = useLocation();
  const { showPopup: initialShowPopup, message } = location.state || {
    showPopup: false,
    message: "",
  };
  const [showPopup, setShowPopup] = useState(initialShowPopup);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/recette", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const CustomLoadingOverlay = () => (
    <div className="loading-container">
      <img id="un" className="un" src={logoBande} alt="" />
      <img className="2" src={logoBande} alt="" />
      <img id="trois" className="trois" src={logoBande} alt="" />
    </div>
  );

  // Définitions de colonnes pour AG Grid
  const depenseColumnDefs = [
    { headerName: "Ticket", field: "id", width: 100 },
    {
      headerName: "Référence",
      field: "reference",
      filter: true,
      valueGetter: (params) => params.data.reference || "N/A",
    },
    {
      headerName: "Tiers",
      field: "tiers",
      filter: true,
      valueGetter: (params) => params.data.tiers || "N/A",
    },
    {
      headerName: "Date",
      field: "date",
      filter: "agDateColumnFilter",
      tooltipValueGetter: (p) =>
        p.value
          ? new Date(p.value).toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "",
      cellRenderer: (params) =>
        params.value
          ? new Date(params.value).toLocaleDateString("fr-FR")
          : "N/A",
    },
    {
      headerName: "Modèle",
      field: "budget[0].modele",
      valueGetter: (params) => params.data.budget?.[0]?.modele || "N/A",
    },
    {
      headerName: "Montant",
      field: "reglement[0].montant",
      filter: "agNumberColumnFilter",
      valueGetter: (params) => params.data.reglement?.[0]?.montant || "N/A",
      valueFormatter: (params) =>
        params.value !== "N/A" ? `${params.value} €` : params.value,
      cellStyle: { display: "flex", justifyContent: "center" },
    },
    {
      headerName: "Règlement",
      field: "reglement[0].reglement",
      valueGetter: (params) => params.data.reglement?.[0]?.reglement || "N/A",
      filter: true,
      cellStyle: { display: "flex", justifyContent: "center" },
    },
    {
      headerName: "Réglé",
      field: "regle",
      width: "100px",
      cellStyle: { display: "flex", justifyContent: "center" },
    },
    {
      headerName: "Comptabilisé",
      field: "compta",
      width: "100px",
      cellStyle: { display: "flex", justifyContent: "center" },
    },
    {
      headerName: "BR9",
      field: "estBR9",
      width: "100px",
      cellStyle: { display: "flex", justifyContent: "center" },
    },
    {
      field: "button",
      headerName: "Button",
      cellRenderer: (params) => {
        return <CallToActions data={params.data} />;
      },
    },
  ];

  const gridOptions = {
    localeText: AG_GRID_LOCALE_FR,
    loadingOverlayComponent: "LoadingOverlay",
    noRowsOverlayComponent: "NoRowsOverlay",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="ag-theme-quartz list-recette__container"
      style={{ height: "60vh" }}
    >
      <AgGridReact
        loading={loading}
        gridOptions={gridOptions}
        rowData={data}
        columnDefs={depenseColumnDefs}
        pagination={true}
        loadingOverlayComponent={CustomLoadingOverlay}
      />
      <Popup
        icon={greenCheck}
        title="Création d'une recette"
        description={message}
        bgIcon="#FFC107"
        colorBorder="#FF9800"
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
    </motion.div>
  );
};
