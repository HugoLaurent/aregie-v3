import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./navbar-style.css";

import {
  logo,
  shortLogo,
  door,
  calendarIcon,
  dashboard,
  notification,
  user,
  userDark,
  reports,
  closeDay,
  closeYear,
  signOut,
  tools,
} from "../../assets/images/index";

import { ButtonList, ButtonIcon, ButtonIconText } from "../Buttons/index";

import { useFullScreen } from "../../Hooks";

export default function NavBar() {
  const [openNavModal, setOpenNavModal] = useState(null);
  const [openToolsModal, setOpenToolsModal] = useState(null);
  const { isFullScreen, toggleFullScreen } = useFullScreen();
  const [currentLogo, setCurrentLogo] = useState(logo);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 1000) {
        setCurrentLogo(shortLogo);
      } else {
        setCurrentLogo(logo);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="Navbar">
      <section className="navbar-left">
        <article className="navbar__logo-container">
          <Link to="/home">
            <img
              src={currentLogo}
              alt="Logo d'aregie"
              className="navbar__logo"
            />
          </Link>
        </article>
        <article className="navbar__cloture-container">
          <img
            src={calendarIcon}
            alt="Icone d'un calendrier"
            className="icon"
          />
          <p>Dernière clôture : 14-08-2013</p>
        </article>
      </section>
      <section className="navbar-right">
        <ButtonIconText
          icon={door}
          alt="Icone d'une porte"
          text="Clôturer la journée"
        />

        <span className="navbar-right__vertical-line"></span>
        <ButtonIconText
          icon={dashboard}
          alt="Icone d'un dashboard"
          text="Dashboard"
        />

        <span className="navbar-right__vertical-line"></span>
        <button className="navbar-right__notification-button">
          <div className="notification-wrapper">
            <img
              src={notification}
              alt="Icone de notification"
              className="icon notification"
            />
          </div>
        </button>
        <ButtonIcon
          icon={tools}
          alt="Icone d'outils"
          onClick={() => {
            setOpenToolsModal(!openToolsModal);
            setOpenNavModal(null);
          }}
        />
        <ButtonIcon
          icon={user}
          alt="Icone d'utilisateur"
          onClick={() => {
            setOpenNavModal(!openNavModal);
            setOpenToolsModal(null);
          }}
        />
      </section>

      <ul
        className={`modal-nav-container ${
          openNavModal === true
            ? "modal-nav-container-active"
            : openNavModal === false
            ? "modal-nav-container-inactive"
            : ""
        }`}
      >
        <li className="modal-nav__item">
          <ButtonList icon={userDark} alt="Icone d'utilisateur" text="Profil" />
        </li>
        <li className="modal-nav__item">
          <ButtonList
            icon={reports}
            alt="Icone de reports journaliers"
            text="Reports Journaliers"
          />
        </li>
        <li className="modal-nav__item">
          <ButtonList
            icon={closeDay}
            alt="Icone de cloture journalière"
            text="Clôture journalière"
          />
        </li>
        <li className="modal-nav__item">
          <ButtonList
            icon={closeYear}
            alt="Icone de cloture annuelle"
            text="Clôture annuelle"
          />
        </li>
        <li className="modal-nav__item">
          <ButtonList
            icon={signOut}
            alt="Icone de déconnexion"
            text="Déconnexion"
          />
        </li>
      </ul>

      <ul
        className={`modal-tools-container ${
          openToolsModal === true
            ? "modal-tools-container-active"
            : openToolsModal === false
            ? "modal-tools-container-inactive"
            : ""
        }`}
      >
        <li className="modal-nav__item">
          <ButtonList icon={tools} alt="Icone de Todo list" text="Todo List" />
        </li>
        <li className="modal-nav__item">
          <ButtonList
            icon={tools}
            alt="Icone de suivie des logs"
            text="Suivie des logs"
          />
        </li>
        <li className="modal-nav__item">
          <ButtonList
            icon={tools}
            alt="Icone de thème sombre"
            text="Thème sombre"
          />
        </li>
        <li className="modal-nav__item">
          <ButtonList icon={tools} alt="Icone de caisse" text="Caisse" />
        </li>
        <li className="modal-nav__item">
          <ButtonList
            icon={tools}
            alt="Icone de plein écran"
            text={isFullScreen ? "Quitter le plein écran" : "Plein écran"}
            onClick={() => {
              toggleFullScreen();
              setOpenToolsModal(false);
            }}
          />
        </li>
      </ul>
    </nav>
  );
}
