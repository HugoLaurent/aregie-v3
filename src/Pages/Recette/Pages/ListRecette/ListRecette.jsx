import "./list-recette-style.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import { AG_GRID_LOCALE_FR } from "@ag-grid-community/locale";

import { BannerLogo } from "../../../../assets/images";
import { CallToActions } from "../../Components";

import { fetchRecettes } from "../../../../redux/slices/recettes/recetteSlice";

export default function ListRecette() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.recipes);

  useEffect(() => {
    if (status === "neutral") {
      dispatch(fetchRecettes());
    }
  }, [status, dispatch]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  const CustomLoadingOverlay = () => (
    <div className="loading-container">
      <img id="un" className="un" src={BannerLogo} alt="" />
      <img className="2" src={BannerLogo} alt="" />
      <img id="trois" className="trois" src={BannerLogo} alt="" />
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
    </motion.div>
  );
}
