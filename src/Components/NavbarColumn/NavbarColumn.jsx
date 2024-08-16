import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./navbar-column.css";

import { calendarBlue, CaretDown } from "./../../assets/images";
import listToDisplay from "./../../assets/data/dataLeftNavbar";

export default function NavbarColumn() {
  const [openCategories, setOpenCategories] = useState({});
  const location = useLocation();

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
                      location.pathname === item.link ||
                      location.pathname.includes(item.link)
                        ? "active"
                        : ""
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
