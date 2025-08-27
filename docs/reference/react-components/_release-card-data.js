import IconReleasesImg from "../img/icon-reference-rnotes.png";
import IconReleaseNotesImg from "../img/icon-reference-notes.png";
import IconReleaseAnnouncementsImg from "../img/icon-reference-announcements.png";
import IconSecurityImg from "../img/icon-reference-security.png";
import IconLicensingImg from "../img/icon-reference-licensing.png";
import IconApiImg from "../img/icon-reference-api.png";
import IconEnvironmentsImg from "../img/icon-reference-environments.png";
import IconSourceImg from "../img/icon-reference-source.png";
import IconDataImg from "../img/icon-reference-data.png";

export const gettingStartedCards = [
  {
    link: "./announcements-release-notes/overview/",
    title: "Release announcements and release notes",
    image: IconReleasesImg,
    description: "Announcements and release notes for all supported versions.",
  },
  {
    link: "./announcements-release-notes/880/880-announcements/",
    title: "8.8 release announcements",
    image: IconReleaseAnnouncementsImg,
    description:
      "Supported environment changes and breaking changes/deprecations.",
  },
  {
    link: "./announcements-release-notes/880/880-release-notes/",
    title: "8.8 release notes",
    image: IconReleaseNotesImg,
    description:
      "New features included in 8.8, including alpha feature releases.",
  },
];

export const securityCards = [
  {
    link: "./notices/",
    title: "Security notices",
    image: IconSecurityImg,
    description: "Security notices published after fixes are available.",
  },
  {
    link: "./licenses/",
    title: "Licensing",
    image: IconLicensingImg,
    description:
      "Licensing information for all Camunda 8 Components version 8.6 and higher.",
  },
  {
    link: "./public-api/",
    title: "Public API",
    image: IconApiImg,
    description: "Learn more about what's included in Camunda 8's public API.",
  },
  {
    link: "./supported-environments/",
    title: "Supported environments",
    image: IconEnvironmentsImg,
    description:
      "Environments and technologies supported for Camunda 8 compatibility.",
  },
  {
    link: "./dependencies/",
    title: "Source code and dependencies",
    image: IconSourceImg,
    description: "Camunda source code access and third-party dependencies.",
  },
  {
    link: "./data-collection/",
    title: "Data collection",
    image: IconDataImg,
    description: "Learn more about Camunda data collection and usage metrics.",
  },
];
