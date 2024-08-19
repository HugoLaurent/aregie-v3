import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { motion } from "framer-motion";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import { Loading } from "./../../index";
import { AG_GRID_LOCALE_FR } from "@ag-grid-community/locale";
import "./../list-style.css";
import "./../../Loading/loading-style.css";
import { logoBande } from "./../../../assets/images";

export const ListRecette = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/list", {
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

  // Column definitions for AG Grid
  const depenseColumnDefs = [
    { headerName: "Ticket", field: "id", width: 100 },
    {
      headerName: "Référence",
      field: "reference",
      filter: true,
    },
    { headerName: "Tiers", field: "nom", filter: true },
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
        new Date(params.value).toLocaleDateString("fr-FR"),
    },
    { headerName: "Modèle", field: "type" },
    {
      headerName: "Montant",
      field: "montant",
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => `${params.value} €`,
      cellStyle: { display: "flex", justifyContent: "center" },
    },
    {
      headerName: "Réglement",
      field: "reglement",
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
};
