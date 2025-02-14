import React, { useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "./_connectors-table.css";
import AmazonBedrockImg from "../img/connector-amazon-bedrock.png";
import AmazonDynamoImg from "../img/connector-aws-dynamodb.png";
import AmazonEventbridgeImg from "../img/connector-amazon-eventbridge.png";
import AmazonSnsImg from "../img/connector-amazon-sns.png";
import AmazonSqsImg from "../img/connector-amazon-sqs.png";
import AmazonLambdaImg from "../img/connector-aws-lambda.png";
import AmazonS3Img from "../img/connector-amazon-s3.png";
import AsanaImg from "../img/connector-asana.png";
import AutomationImg from "../img/connector-automation.png";
import AzureaiImg from "../img/connector-azure-openai.png";
import BoxImg from "../img/connector-box.png";
import BluePrismImg from "../img/connector-blueprism.png";
import CamundaImg from "../img/connector-camunda.png";
import EasypostImg from "../img/connector-easypost.png";
import EmailImg from "../img/connector-email.png";
import GithubImg from "../img/connector-github.png";
import GitlabImg from "../img/connector-gitlab.png";
import GoogleDriveImg from "../img/connector-google-drive.png";
import GoogleGeminiImg from "../img/connector-google-gemini.png";
import GoogleMapsImg from "../img/connector-google-maps.png";
import GoogleSheetsImg from "../img/connector-google-sheets.png";
import GraphqlImg from "../img/connector-graphql.png";
import HuggingFaceImg from "../img/connector-hugging-face.png";
import KafkaImg from "../img/connector-kafka.png";
import Microsoft365Img from "../img/connector-365.png";
import MicrosoftTeamsImg from "../img/connector-teams.png";
import OpenaiImg from "../img/connector-openai.png";
import RestImg from "../img/connector-rest.png";
import RabbitmqImg from "../img/connector-rabbitmq.png";
import SalesforceImg from "../img/connector-salesforce.png";
import SendgridImg from "../img/connector-sendgrid.png";
import SlackImg from "../img/connector-slack.png";
import SoapImg from "../img/connector-soap.png";
import SqlImg from "../img/connector-sql.png";
import TwilioImg from "../img/connector-twilio.png";
import UipathImg from "../img/connector-uipath.png";
import WebhookImg from "../img/connector-webhook.png";
import WhatsappImg from "../img/connector-whatsapp.png";

const SearchableTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const connectors = [
    {
      name: "Amazon Bedrock",
      description: "Interact with Amazon Bedrock from your processes.",
      type: "Outbound",
      link: "../amazon-bedrock",
      image: AmazonBedrockImg,
    },
    {
      name: "Amazon Comprehend",
      description:
        "Interact with the Amazon Comprehend service from your processes.",
      type: "Outbound",
      link: "../amazon-comprehend",
      image: AmazonBedrockImg,
    },
    {
      name: "Amazon DynamoDB",
      description: "Interact with the Amazon DynamoDB NoSQL database service.",
      type: "Outbound",
      link: "../amazon-dynamodb/",
      image: AmazonDynamoImg,
    },
    {
      name: "Amazon EventBridge Service",
      description:
        "Send events using Amazon EventBridge service within your processes.",
      type: "Outbound",
      link: "../amazon-eventbridge/?awseventbridge=outbound",
      image: AmazonEventbridgeImg,
    },
    {
      name: "Amazon EventBridge Webhook",
      description: "Start a process instance triggered by Amazon EventBridge.",
      type: "Inbound",
      link: "../amazon-eventbridge/?awseventbridge=inbound",
      image: AmazonEventbridgeImg,
    },
    {
      name: "AWS Lambda",
      description: "Invoke AWS Lambda Functions from your processes.",
      type: "Outbound",
      link: "../aws-lambda/",
      image: AmazonLambdaImg,
    },
    {
      name: "Amazon SageMaker",
      description:
        "Interact with the Amazon SageMaker service from your processes.",
      type: "Outbound",
      link: "../amazon-sagemaker/",
      image: AmazonBedrockImg,
    },
    {
      name: "Amazon S3",
      description: "Interact with Amazon S3 from your processes.",
      type: "Outbound",
      link: "../amazon-s3/",
      image: AmazonS3Img,
    },
    {
      name: "Amazon SNS inbound",
      description: "Trigger your process with an Amazon SNS notification.",
      type: "Inbound",
      link: "../amazon-sns/?amazonsns=inbound",
      image: AmazonSnsImg,
    },
    {
      name: "Amazon SNS outbound",
      description: "Send messages to Amazon SNS from your processes.",
      type: "Outbound",
      link: "../amazon-sns/?amazonsns=outbound",
      image: AmazonSnsImg,
    },
    {
      name: "Amazon SQS",
      description: "Send messages to Amazon SQS from your processes.",
      type: "Outbound",
      link: "../amazon-sqs/?amazonsqs=outbound",
      image: AmazonSqsImg,
    },
    {
      name: "Amazon SQS",
      description: "Receive messages from Amazon SQS in your processes.",
      type: "Inbound",
      link: "../amazon-sqs/?amazonsqs=inbound",
      image: AmazonSqsImg,
    },
    {
      name: "Amazon Textract",
      description:
        "Interact with the Amazon Textract Service from your processes.",
      type: "Outbound",
      link: "../amazon-textract/",
      image: AmazonBedrockImg,
    },
    {
      name: "Asana Connector",
      description: "Manage Asana projects and tasks from your processes.",
      type: "Outbound",
      link: "../asana/",
      image: AsanaImg,
    },
    {
      name: "Automation Anywhere",
      description:
        "Orchestrate your Automation Anywhere queue from your processes.",
      type: "Outbound",
      link: "../automation-anywhere/",
      image: AutomationImg,
    },
    {
      name: "Azure OpenAI",
      description: "Interact with Azure OpenAI from your processes.",
      type: "Outbound",
      link: "../azure-open-ai/",
      image: AzureaiImg,
    },
    {
      name: "Blue Prism",
      description:
        "Orchestrate your Blue Prism queue items from your processes.",
      type: "Outbound",
      link: "../blueprism/",
      image: BluePrismImg,
    },
    {
      name: "Box",
      description: "Interact with the Box storage API from your processes.",
      type: "Outbound",
      link: "../box/",
      image: BoxImg,
    },
    {
      name: "Camunda Operate",
      description: "Fetch process execution data from Camunda Operate.",
      type: "Outbound",
      link: "../operate/",
      image: CamundaImg,
    },
    {
      name: "EasyPost",
      description:
        "Create EasyPost addresses, parcels, shipments from your processes.",
      type: "Outbound",
      link: "../easy-post/",
      image: EasypostImg,
    },
    {
      name: "Email",
      description:
        "Connect your BPMN service to an email POP3, IMAP or SMTP server.",
      type: "Outbound",
      link: "../email/?email=outbound",
      image: EmailImg,
    },
    {
      name: "Email",
      description: "Connect your BPMN service to an email IMAP server.",
      type: "Inbound",
      link: "../email/?email=inbound",
      image: EmailImg,
    },
    {
      name: "GitHub",
      description: "Manage GitHub issues and releases from your processes.",
      type: "Outbound",
      link: "../github/?github=outbound",
      image: GithubImg,
    },
    {
      name: "GitHub Webhook",
      description: "Start a process instance triggered by a GitHub event.",
      type: "Inbound",
      link: "../github/?github=inbound",
      image: GithubImg,
    },
    {
      name: "GitLab",
      description: "Manage GitLab issues and releases from your processes.",
      type: "Outbound",
      link: "../gitlab/",
      image: GitlabImg,
    },
    {
      name: "Google Drive",
      description: "Create folders or files from Google Drive templates.",
      type: "Outbound",
      link: "../googledrive/",
      image: GoogleDriveImg,
    },
    {
      name: "Google Gemini",
      description: "Access Google Gemini multimodal models.",
      type: "Outbound",
      link: "../google-gemini/",
      image: GoogleGeminiImg,
    },
    {
      name: "Google Maps Platform",
      description:
        "Validate addresses, retrieve postal addresses, and calculate distances.",
      type: "Outbound",
      link: "../google-maps-platform/",
      image: GoogleMapsImg,
    },
    {
      name: "Google Sheets",
      description:
        "Work with spreadsheets on Google Drive from your processes.",
      type: "Outbound",
      link: "../google-sheets/",
      image: GoogleSheetsImg,
    },
    {
      name: "GraphQL",
      description: "Execute a GraphQL query or mutation from your processes.",
      type: "Outbound",
      link: "../../protocol/graphql/",
      image: GraphqlImg,
    },
    {
      name: "HTTP Webhook",
      description:
        "Start a process instance with your custom webhook configuration.",
      type: "Outbound",
      link: "../../protocol/http-webhook/",
      image: WebhookImg,
    },
    {
      name: "Hugging Face",
      description: "Interact with Hugging Face models from your processes.",
      type: "Outbound",
      link: "../hugging-face/",
      image: HuggingFaceImg,
    },
    {
      name: "Kafka Consumer",
      description: "Consume messages from Kafka from your processes.",
      type: "Inbound",
      link: "../kafka/?kafka=inbound",
      image: KafkaImg,
    },
    {
      name: "Kafka Producer",
      description: "Produce messages to Kafka from your processes.",
      type: "Outbound",
      link: "../kafka/?kafka=outbound",
      image: KafkaImg,
    },
    {
      name: "Microsoft 365",
      description: "Interactions with Microsoft 365 mail from your processes.",
      type: "Outbound",
      link: "../microsoft-o365-mail/",
      image: Microsoft365Img,
    },
    {
      name: "Microsoft Teams",
      description: "Interactions with Microsoft Teams from your processes.",
      type: "Outbound",
      link: "../microsoft-teams/",
      image: MicrosoftTeamsImg,
    },
    {
      name: "OpenAI",
      description: "Interact with ChatGPT and OpenAI Moderation API.",
      type: "Outbound",
      link: "../openai/",
      image: OpenaiImg,
    },
    {
      name: "Polling",
      description:
        "Poll an endpoint at regular intervals, enabling periodic data fetching.",
      type: "Outbound",
      link: "../../protocol/polling/",
      image: RestImg,
    },
    {
      name: "RabbitMQ Consumer",
      description: "Receive messages from RabbitMQ in your processes.",
      type: "Inbound",
      link: "../rabbitmq/?rabbitmq=inbound",
      image: RabbitmqImg,
    },
    {
      name: "RabbitMQ Producer",
      description: "Send messages to RabbitMQ from your processes.",
      type: "Outbound",
      link: "../rabbitmq/?rabbitmq=outbound",
      image: RabbitmqImg,
    },
    {
      name: "REST",
      description:
        "Send a request to a REST API and use the response in your processes.",
      type: "Outbound",
      link: "../../protocol/rest/",
      image: RestImg,
    },
    {
      name: "Salesforce",
      description: "Manage your Salesforce instance from your processes.",
      type: "Outbound",
      link: "../salesforce/",
      image: SalesforceImg,
    },
    {
      name: "SendGrid",
      description: "Quickly send emails from your processes.",
      type: "Outbound",
      link: "../sendgrid/",
      image: SendgridImg,
    },
    {
      name: "Slack inbound",
      description:
        "Trigger a Slack bot to start a process with an event or slash command.",
      type: "Inbound",
      link: "../slack/?slack=inbound",
      image: SlackImg,
    },
    {
      name: "Slack outbound",
      description:
        "Send messages to Slack workspace channels or users from your processes.",
      type: "Outbound",
      link: "../slack/?slack=outbound",
      image: SlackImg,
    },
    {
      name: "SOAP",
      description:
        "Connect with Simple Object Access Protocol (SOAP) services.",
      type: "Outbound",
      link: "../../protocol/soap/",
      image: SoapImg,
    },
    {
      name: "SQL",
      description:
        "Connect with SQL databases (Microsoft SQL Server, PostgreSQL, MySQL).",
      type: "Outbound",
      link: "../sql/",
      image: SqlImg,
    },
    {
      name: "Twilio",
      description:
        "Send and get SMS messages with Twilio service from your processes.",
      type: "Outbound",
      link: "../twilio/?twilio=outbound",
      image: TwilioImg,
    },
    {
      name: "Twilio Webhook",
      description: "Start a process instance triggered by a Twilio webhook.",
      type: "Inbound",
      link: "../twilio/?twilio=inbound",
      image: TwilioImg,
    },
    {
      name: "UiPath",
      description: "Orchestrate your UiPath Bots with Camunda.",
      type: "Outbound",
      link: "../uipath/",
      image: UipathImg,
    },
    {
      name: "WhatsApp",
      description: "Send messages with WhatsApp Business from your processes.",
      type: "Outbound",
      link: "../whatsapp/",
      image: WhatsappImg,
    },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterType = (type) => {
    setFilterType(type);
  };

  const filteredConnectors = connectors.filter((connector) => {
    const matchesSearchTerm =
      connector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connector.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilterType =
      filterType === "All" || connector.type === filterType;
    return matchesSearchTerm && matchesFilterType;
  });

  return (
    <div className="connector-input">
      <input
        type="text"
        placeholder="Find a Camunda connector"
        value={searchTerm}
        onChange={handleSearch}
        className="connector-input-box"
      />
      <div className="filter-badges">
        <span
          className={`badge--default ${
            filterType === "All" ? "badge--active" : ""
          }`}
          onClick={() => handleFilterType("All")}
        >
          All
        </span>
        <span
          className={`badge--default ${
            filterType === "Inbound" ? "badge--active--inbound" : ""
          }`}
          onClick={() => handleFilterType("Inbound")}
        >
          Inbound
        </span>
        <span
          className={`badge--default ${
            filterType === "Outbound" ? "badge--active--outbound" : ""
          }`}
          onClick={() => handleFilterType("Outbound")}
        >
          Outbound
        </span>
      </div>
      <span className="connector-input-link-about">
        <a href="../../connector-types">About connector types</a>
      </span>
      {filteredConnectors.length > 0 ? (
        <div className="connector-grid">
          {filteredConnectors.map((connector, index) => (
            <a key={index} href={connector.link} className="connector-card">
              <div className="connector-card-image">
                <img src={connector.image} alt={connector.name} />
              </div>
              <div className="connector-name">
                <h3>{connector.name}</h3>
              </div>
              <div className="connector-description">
                <p>{connector.description}</p>
              </div>
              <div className="connector-type">
                <span
                  className={`badge badge--${connector.type.toLowerCase()}`}
                >
                  {connector.type}
                </span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div>
          <p className="connector-no-results">
            Sorry, no connectors were found matching that search term and type.
          </p>
          <p className="connector-no-results-list">
            <ul>
              <li>Check your spelling.</li>
              <li>
                Try a different search term. For example, search for "Amazon"
                instead of "AWS".
              </li>
              <li>
                Change the type filter. For example, apply the "All" filter to
                see if the connector exists.
              </li>
            </ul>
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchableTable;
