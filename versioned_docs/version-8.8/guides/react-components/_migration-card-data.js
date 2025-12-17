import IconPrepImg from "../img/icon-migration-checklist.png";
import IconCodeImg from "../img/icon-migration-code.png";
import IconToolingImg from "../img/icon-migration-tooling.png";
import IconBpmImg from "../img/icon-migration-bpm.png";
import IconJourneyImg from "../img/icon-migration-journey.png";
import IconConceptImg from "../img/icon-migration-concept.png";

export const gettingStartedCards = [
  {
    link: "./migration-journey",
    title: "Migration journey",
    image: IconJourneyImg,
    description: "Learn about common themes in the migration journey.",
  },
  {
    link: "./conceptual-differences",
    title: "Conceptual differences",
    image: IconConceptImg,
    description:
      "Important conceptual differences to know when planning your migration.",
  },
  {
    link: "./migration-tooling",
    title: "Migration tooling",
    image: IconToolingImg,
    description:
      "Camunda tooling to ease migration from Camunda 7 to Camunda 8.",
  },
  {
    link: "./migration-readiness",
    title: "Migration preparation",
    image: IconPrepImg,
    description:
      "Rules and development practices for smooth migration preparation.",
  },
];
