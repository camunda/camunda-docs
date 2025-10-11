import IconConfig from "../img/icon-config.png";
import IconPrereqs from "../img/icon-prereqs.png";
import IconExample from "../img/icon-example.png";
import IconIdpApplication from "../img/icon-idp-application.png";
import IconIdpExtraction from "../img/icon-idp-extraction.png";
import IconIdpIntegrate from "../img/icon-idp-integrate.png";

// Config cards on introduction page
export const configCards = [
  {
    link: "./idp-configuration",
    title: "Configure IDP",
    image: IconConfig,
    description:
      "Configure IDP for your Camunda 8 setup with access to the required components and credentials.",
  },
  {
    link: "./idp-configuration#prerequisites",
    title: "Prerequisites",
    image: IconPrereqs,
    description:
      "Check prerequisites required for IDP such as AWS IAM user permissions and Amazon S3 bucket access.",
  },
  {
    link: "./idp-configuration#examples",
    title: "Example IDP deployment",
    image: IconExample,
    description:
      "Deploy and run Camunda 8 IDP in a local development environment using Camunda 8 Run or Docker.",
  },
];

// Getting started cards on introduction page
export const gettingStartedCards = [
  {
    link: "./idp-applications",
    title: "IDP applications",
    image: IconIdpApplication,
    description:
      "Start by creating an IDP application in which to store and manage your IDP document extraction templates.",
  },
  {
    link: "./idp-document-extraction",
    title: "Document extraction",
    image: IconIdpExtraction,
    description:
      "Publish a document extraction template for each type of document you want to extract data from.",
  },
  {
    link: "./idp-integrate",
    title: "IDP integration",
    image: IconIdpIntegrate,
    description:
      "Integrate your published document extraction templates into your end-to-end processes.",
  },
];
