import IconPlayImg from "../img/icon-play.png";
import IconConnectorImg from "../img/icon-connectors.png";
import IconConnectorTypesImg from "../img/icon-connector-types.png";
import IconConnectorSdkImg from "../img/icon-connector-sdk.png";
import IconConnectorTemplateImg from "../img/icon-connector-template.png";
import IconConnectorCustomImg from "../img/icon-connector-custom.png";
import AmazonS3Img from "../img/connector-amazon-s3.png";
import BoxImg from "../img/connector-box.png";
import OpenaiImg from "../img/connector-openai.png";
import AwsLambdaImg from "../img/connector-aws-lambda.png";
import RestImg from "../img/connector-rest.png";
import EmailImg from "../img/connector-email.png";
import BedrockImg from "../img/connector-amazon-bedrock.png";
import SqlImg from "../img/connector-sql.png";
import GraphqlImg from "../img/connector-graphql.png";
import AsanaImg from "../img/connector-asana.png";
import AutomationImg from "../img/connector-automation.png";

// Getting started cards on connectors introduction page
export const gettingStartedCards = [
  {
    link: "../use-connectors",
    title: "How to use Connectors",
    image: IconPlayImg,
    description: "Create a connector task and start using connector secrets.",
  },
  {
    link: "../connector-types",
    title: "Connector types",
    image: IconConnectorTypesImg,
    description: "Learn about inbound and outbound connector types.",
  },
  {
    link: "../out-of-the-box-connectors/available-connectors-overview",
    title: "Camunda connectors",
    image: IconConnectorImg,
    description:
      "Find technical documentation for prebuilt Camunda connectors.",
  },
];

// Custom connector cards on connectors introduction page
export const customConnectorCards = [
  {
    link: "../custom-built-connectors/build-connector",
    title: "Custom Connectors",
    image: IconConnectorCustomImg,
    description: "Learn how to build and deploy your own custom connectors.",
  },
  {
    link: "../custom-built-connectors/connector-templates",
    title: "Connector templates",
    image: IconConnectorTemplateImg,
    description: "Create, generate, and manage connector templates.",
  },
  {
    link: "../custom-built-connectors/connector-sdk",
    title: "Connector SDK",
    image: IconConnectorSdkImg,
    description: "Use the SDK to create your own custom Java connectors.",
  },
];

// 3 large Latest tab cards on connectors introduction page
export const latestConnectorCards = [
  {
    link: "../out-of-the-box-connectors/amazon-s3",
    title: "Amazon S3",
    image: AmazonS3Img,
    description: "Interact with Amazon Bedrock from your processes.",
  },
  {
    link: "../out-of-the-box-connectors/box",
    title: "Box",
    image: BoxImg,
    description: "Connect your BPMN service to the Box storage API.",
  },
  {
    link: "../out-of-the-box-connectors/email/?email=outbound",
    title: "Email outbound",
    image: EmailImg,
    description:
      "Connect your BPMN service to an email POP3, IMAP or SMTP server.",
  },
];

// 3 large Popular tab cards on connectors introduction page
export const popularConnectorCards = [
  {
    link: "../out-of-the-box-connectors/openai",
    title: "OpenAI",
    image: OpenaiImg,
    description:
      "Add ChatGPT and OpenAI's Moderation API to your business processes.",
  },
  {
    link: "../out-of-the-box-connectors/aws-lambda",
    title: "Amazon AWS Lambda",
    image: AwsLambdaImg,
    description:
      "Connect processes to AWS Lambda to invoke serverless functions.",
  },
  {
    link: "../protocol/rest",
    title: "Rest connector",
    image: RestImg,
    description:
      "Connect, interact, and sync your processes with any RESTful service.",
  },
];

// 3 small Latest tab cards on connectors introduction page
export const latestConnectorCardsSml = [
  {
    link: "../out-of-the-box-connectors/email/?email=inbound",
    title: "Email inbound",
    image: EmailImg,
  },
  {
    link: "../out-of-the-box-connectors/amazon-bedrock",
    title: "Amazon Bedrock",
    image: BedrockImg,
  },
  {
    link: "../out-of-the-box-connectors/sql",
    title: "SQL",
    image: SqlImg,
  },
];

// 3 small Popular tab cards on connectors introduction page
export const popularConnectorCardsSml = [
  {
    link: "../protocol/graphql",
    title: "GraphQL",
    image: GraphqlImg,
  },
  {
    link: "../out-of-the-box-connectors/asana",
    title: "Asana",
    image: AsanaImg,
  },
  {
    link: "../out-of-the-box-connectors/automation-anywhere",
    title: "Automation Anywhere",
    image: AutomationImg,
  },
];
