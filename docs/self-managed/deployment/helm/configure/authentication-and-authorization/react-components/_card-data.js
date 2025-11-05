// this makes use of the Zeebe react grid component

// import style for only 2 cards
import "./_card.css";

import IconGear from "../../../../../../components/assets/icon-orchcluster.png";

// Backup and Restore overview cards data
export const overviewCards = [
  {
    link: "../external-keycloak",
    title: "External Keycloak",
    image: IconGear,
    description:
      "Use an externally hosted Keycloak instance where the Camunda Management Identity component can automatically populate the realm.",
  },
  {
    link: "../microsoft-entra",
    title: "Microsoft Entra",
    image: IconGear,
    description:
      "Connect Camunda to Microsoft Entra ID for authentication and authorization.",
  },
  {
    link: "../generic-oidc-provider",
    title: "Generic OIDC Provider",
    image: IconGear,
    description:
      "Connect Camunda to any other OIDC-compliant provider or Keycloak without Management Identity setup support.",
  },
];
