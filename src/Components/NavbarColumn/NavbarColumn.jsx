import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./navbar-column.css";

import {
  calendarBlue,
  CardHolder,
  FolderSimple,
  GearSix,
  UserCircleGear,
  CodaLogo,
  CaretDown,
} from "./../../assets/images";

// Liste des éléments du menu
const listToDisplay = [
  {
    category: "Pièces Comptables",
    icon: CodaLogo,
    items: [
      { name: "Dépenses", link: "/depenses" },
      { name: "Recettes", link: "/recettes" },
      { name: "Factures", link: "/factures" },
      { name: "Écritures autres", link: "/ecritures-autres" },
    ],
  },
  {
    category: "Comptes",
    icon: CardHolder,
    items: [
      { name: "Bordereaux", link: "/bordereaux" },
      { name: "Livre journal", link: "/livre-journal" },
      { name: "Carnet de disponibilités", link: "/carnet-disponibilites" },
      { name: "Balance", link: "/balance" },
      { name: "Carnet de rectification", link: "/carnet-rectification" },
    ],
  },
  {
    category: "Administration",
    icon: UserCircleGear,
    items: [
      { name: "Liste des tiers", link: "/liste-tiers" },
      { name: "Liste des banques", link: "/liste-banques" },
      { name: "Gestion des stocks", link: "/gestion-stocks" },
    ],
  },
  {
    category: "Paramétrage",
    icon: GearSix,
    items: [
      { name: "Gestion de la régie", link: "/gestion-regie" },
      { name: "Liste des utilisateurs", link: "/liste-utilisateurs" },
      { name: "Gestion des modèles", link: "/gestion-modeles" },
      { name: "Gestion des budgets", link: "/gestion-budgets" },
      { name: "Gestion des règlements", link: "/gestion-reglements" },
      { name: "Gestion des bordereaux", link: "/gestion-bordereaux" },
    ],
  },
  {
    category: "Arrêtés",
    icon: FolderSimple,
    items: [
      { name: "Arrêtés de régie", link: "/arretes-regie" },
      { name: "Arrêtés de nomination", link: "/arretes-nomination" },
      { name: "Modèles documentaires", link: "/modeles-documentaires" },
    ],
  },
];

export default function NavbarColumn() {
  const [openCategories, setOpenCategories] = useState({});
  const location = useLocation(); // Obtient l'URL actuelle

  const toggleCategory = (category) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <section className="navbar-column-container">
      <section className="navbar-colum__date-container">
        <button className="navbar-column__button-calendar">
          <img src={calendarBlue} alt="Icone d'un calendrier" />
        </button>
        <article className="navbar-column__button-calendar-text">
          <p>Ville de Nancy</p>
          <p className="navbar-column__date">20-09-2024</p>
        </article>
      </section>

      <section className="navbar-column__link-container">
        {listToDisplay.map((menu) => (
          <div key={menu.category} className="navbar-column__menu">
            <div
              className={`navbar-column__menu-title ${
                openCategories[menu.category]
                  ? "navbar-column__menu-title-active"
                  : ""
              }`}
              onClick={() => toggleCategory(menu.category)}
            >
              <section className="button-left-side">
                <img
                  src={menu.icon}
                  alt=""
                  className={`navbar-icon__column ${
                    openCategories[menu.category] ? "filter-on" : "filter-off"
                  }`}
                />
                <p
                  className={`arrow ${
                    openCategories[menu.category] ? "white" : ""
                  }`}
                >
                  {menu.category}
                </p>
              </section>
              <img
                src={CaretDown}
                alt=""
                className={`arrow ${
                  openCategories[menu.category]
                    ? "arrow-up filter-on"
                    : "arrow-down filter-off"
                }`}
              />
            </div>

            {openCategories[menu.category] && (
              <div className="navbar-column__submenu">
                {menu.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className={`navbar-column__submenu-item ${
                      location.pathname === item.link ? "active" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </section>
  );
}
