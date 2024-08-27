import "./breadcrumbs-style.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { caretRight } from "../../assets/images";
import listToDisplay from "../../assets/data/dataLeftNavbar";

export default function BreadCrumbs() {
  const location = useLocation();

  const currentPath = location.pathname;
  const locationArray = currentPath.split("/").filter((item) => item !== "");

  // Retourner null si le chemin contient un seul segment
  if (locationArray.length <= 1) return null;
  // Test if locationArray[0] is a number
  if (!isNaN(locationArray[1])) {
    return (
      <ol className="breadcrumbs-container">
        <li className="breadcrumbds-item">
          <Link
            to={`/${locationArray[0]}`}
            role="button"
            style={{ textTransform: "capitalize" }}
          >
            {locationArray[0]}
          </Link>
        </li>
        <img src={caretRight} alt="Caret Right" />
        <li>
          <span style={{ textTransform: "capitalize" }}>
            {locationArray[0]}
          </span>{" "}
          n°
          {locationArray[1]}
        </li>
      </ol>
    );
  } else {
    return (
      <ol className="breadcrumbs-container">
        {locationArray.map((item, index) => {
          let foundName = item;
          let fullPath = `/${locationArray.slice(0, index + 1).join("/")}`;

          // Logique pour les segments statiques
          listToDisplay.forEach((category) => {
            category.items.forEach((element) => {
              if (element.link === fullPath) {
                foundName =
                  locationArray.length === 1 ? element.title : element.name;
              } else if (element.subLink && element.subLink.link === fullPath) {
                foundName = element.subLink.name;
              }
            });
          });

          return (
            <React.Fragment key={index}>
              <li className="breadcrumbds-item">
                <Link to={fullPath} role="button">
                  {foundName}
                </Link>
              </li>
              {index < locationArray.length - 1 && (
                <img src={caretRight} alt="Caret Right" />
              )}
            </React.Fragment>
          );
        })}
      </ol>
    );
  }
}
