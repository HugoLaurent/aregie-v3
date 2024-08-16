import "./breadcrumbs-style.css";
import { Link, useLocation } from "react-router-dom";
import listToDisplay from "../../assets/data/dataLeftNavbar";
import { caretRight } from "../../assets/images";

export default function BreadCrumbs() {
  const location = useLocation();
  const currentPath = location.pathname;
  const locationArray = currentPath.split("/").filter((item) => item !== "");

  // Retourner null si le chemin contient un seul segment
  if (locationArray.length <= 1) return null;

  return (
    <ol className="breadcrumbs-container">
      {locationArray.map((item, index) => {
        let foundName = item;
        let fullPath = `/${locationArray.slice(0, index + 1).join("/")}`;

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
          <>
            <li className="breadcrumbds-item" key={index}>
              <Link to={fullPath} role="button">
                {foundName}
              </Link>
            </li>
            {index < locationArray.length - 1 && (
              <img src={caretRight} alt="Caret Right" />
            )}
          </>
        );
      })}
    </ol>
  );
}
