import IconToolingImg from "../img/icon-migration-tooling.png";
import IconJourneyImg from "../img/icon-migration-journey.png";
import IconConceptImg from "../img/icon-migration-concept.png";

export const gettingStartedCards = [
  {
    link: "./announcements-release-notes/overview/",
    title: "Release announcements and release notes",
    image: IconJourneyImg,
    description: "Announcements and release notes for all supported versions.",
  },
  {
    link: "./announcements-release-notes/880/880-announcements/",
    title: "8.8 release announcements",
    image: IconConceptImg,
    description:
      "Supported environment changes and breaking changes/deprecations.",
  },
  {
    link: "./announcements-release-notes/880/880-release-notes/",
    title: "8.8 release notes",
    image: IconToolingImg,
    description:
      "New features included in 8.8, including alpha feature releases.",
  },
];

export const securityCards = [
  {
    link: "./notices/",
    title: "Security notices",
    image: IconJourneyImg,
    description: "Security notices published after fixes are available.",
  },
  {
    link: "./licenses/",
    title: "Licensing",
    image: IconConceptImg,
    description:
      "Licensing information for all Camunda 8 Components version 8.6 and higher.",
  },
  {
    link: "./public-api/",
    title: "Public API",
    image: IconToolingImg,
    description: "Learn more about what's included in Camunda 8's public API.",
  },
  {
    link: "./supported-environments/",
    title: "Supported environments",
    image: IconToolingImg,
    description:
      "Environments and technologies supported for Camunda 8 compatibility.",
  },
  {
    link: "./dependencies/",
    title: "Source code and dependencies",
    image: IconToolingImg,
    description: "Camunda source code access and third-party dependencies.",
  },
];
