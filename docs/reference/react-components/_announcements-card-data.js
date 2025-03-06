import IconAnnouncement from "./assets/icon-announcement.png";
import IconArrow from "./assets/icon-arrow.png";
import IconBlackbox from "./assets/icon-blackbox.png";

// Getting started cards on Announcements introduction page
export const AnnouncementsCards = [
  {
    link: "/docs/next/announcements-release-notes/880/880-release-notes.md#identity-management-updates",
    title: "Identity management updates",
    image: IconAnnouncement,
    description:
      "The Identity service is enhanced to deliver greater flexibility, control, and security for both Self-Managed and SaaS users.",
  },
  {
    link: "/docs/next/announcements-release-notes/880/880-release-notes.md#camunda-exporter",
    title: "Camunda Exporter",
    image: IconArrow,
    description:
      "A new Camunda Exporter brings the importer and archiving logic of web components (Tasklist and Operate) closer to the distributed platform (Zeebe).",
  },
  {
    link: "/docs/next/announcements-release-notes/880/880-release-notes.md#camunda-8-rest-api-query-api",
    title: "Camunda 8 REST API Query API",
    image: IconBlackbox,
    description:
      "You can now use a single Query API in the Camunda 8 REST API to find process and decision data instead of using multiple component APIs.",
  },
];
