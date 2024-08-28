import {
  CardHolderIcon,
  FolderIcon,
  GearIcon,
  UserSettingsIcon,
  CodaLogoIcon,
} from "./../../assets/images";

const listToDisplay = [
  {
    category: "Pièces Comptables",
    icon: CodaLogoIcon,
    items: [
      {
        name: "Recettes",
        title: "Liste des recettes",
        link: "/recettes",
        subLink: {
          name: "Ajouter une recette",
          link: "/recettes/ajouter-une-recette",
        },
      },
      { name: "Dépenses", link: "/depenses" },

      { name: "Factures", link: "/factures" },
      { name: "Écritures autres", link: "/ecritures-autres" },
    ],
  },
  {
    category: "Comptes",
    icon: CardHolderIcon,
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
    icon: UserSettingsIcon,
    items: [
      { name: "Liste des tiers", link: "/liste-tiers" },
      { name: "Liste des banques", link: "/liste-banques" },
      { name: "Gestion des stocks", link: "/gestion-stocks" },
    ],
  },
  {
    category: "Paramétrage",
    icon: GearIcon,
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
    icon: FolderIcon,
    items: [
      { name: "Arrêtés de régie", link: "/arretes-regie" },
      { name: "Arrêtés de nomination", link: "/arretes-nomination" },
      { name: "Modèles documentaires", link: "/modeles-documentaires" },
    ],
  },
];

export default listToDisplay;
