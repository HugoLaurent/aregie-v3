import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./navbar-style.css";

import {
  MainLogo,
  ShortLogo,
  DoorIcon,
  CalendarIcon,
  DashboardIcon,
  NotificationIcon,
  UserIcon,
  UserDarkIcon,
  ReportsIcon,
  CloseDayIcon,
  CloseYearIcon,
  SignOutIcon,
  ToolsIcon,
} from "../../assets/images/index";

import { ButtonList, ButtonIcon, ButtonIconText } from "../Buttons/index";

import { useFullScreen } from "../../Hooks";

export default function NavBar() {
  const [openNavModal, setOpenNavModal] = useState(null);
  const [openToolsModal, setOpenToolsModal] = useState(null);
  const { isFullScreen, toggleFullScreen } = useFullScreen();
  const [currentLogo, setCurrentLogo] = useState(MainLogo);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 1000) {
        setCurrentLogo(ShortLogo);
      } else {
        setCurrentLogo(MainLogo);
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
          <Link to="/">
            <img
              src={currentLogo}
              alt="Logo d'aregie"
              className="navbar__logo"
            />
          </Link>
        </article>
        <article className="navbar__cloture-container">
          <img
            src={CalendarIcon}
            alt="Icone d'un calendrier"
            className="icon"
          />
          <p>Dernière clôture : 14-08-2013</p>
        </article>
      </section>
      <section className="navbar-right">
        <ButtonIconText
          icon={DoorIcon}
          alt="Icone d'une porte"
          text="Clôturer la journée"
          textColor="#fff"
        />

        <span className="navbar-right__vertical-line"></span>
        <ButtonIconText
          icon={DashboardIcon}
          alt="Icone d'un DashboardIcon"
          text="Dashboard"
          textColor="#fff"
        />

        <span className="navbar-right__vertical-line"></span>
        <button className="navbar-right__notification-button">
          <div className="notification-wrapper">
            <img
              src={NotificationIcon}
              alt="Icone de notification"
              className="icon notification"
            />
          </div>
        </button>
        <ButtonIcon
          icon={ToolsIcon}
          alt="Icone d'outils"
          onClick={() => {
            setOpenToolsModal(!openToolsModal);
            setOpenNavModal(null);
          }}
        />
        <ButtonIcon
          icon={UserIcon}
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
          <ButtonList
            icon={UserDarkIcon}
            alt="Icone d'utilisateur"
            text="Profil"
          />
        </li>
        <li className="modal-nav__item">
          <ButtonList
            icon={ReportsIcon}
            alt="Icone de reports journaliers"
            text="Reports Journaliers"
          />
        </li>
        <li className="modal-nav__item">
          <ButtonList
            icon={CloseDayIcon}
            alt="Icone de cloture journalière"
            text="Clôture journalière"
          />
        </li>
        <li className="modal-nav__item">
          <ButtonList
            icon={CloseYearIcon}
            alt="Icone de cloture annuelle"
            text="Clôture annuelle"
          />
        </li>
        <li className="modal-nav__item">
          <ButtonList
            icon={SignOutIcon}
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
          <ButtonList
            icon={ToolsIcon}
            alt="Icone de Todo list"
            text="Todo List"
          />
        </li>
        <li className="modal-nav__item">
          <ButtonList
            icon={ToolsIcon}
            alt="Icone de suivie des logs"
            text="Suivie des logs"
          />
        </li>
        <li className="modal-nav__item">
          <ButtonList
            icon={ToolsIcon}
            alt="Icone de thème sombre"
            text="Thème sombre"
          />
        </li>
        <li className="modal-nav__item">
          <ButtonList icon={ToolsIcon} alt="Icone de caisse" text="Caisse" />
        </li>
        <li className="modal-nav__item">
          <ButtonList
            icon={ToolsIcon}
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
