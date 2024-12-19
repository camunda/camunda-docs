import React, { useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "./connectors-table.css";
import AmazonBedrockImg from "../img/connector-amazon-bedrock.png";
import AmazonDynamoImg from "../img/connector-aws-dynamodb.png";
import AmazonEventbridgeImg from "../img/connector-amazon-eventbridge.png";
import AmazonSnsImg from "../img/connector-amazon-sns.png";
import AmazonSqsImg from "../img/connector-amazon-sqs.png";
import AmazonLambdaImg from "../img/connector-aws-lambda.png";
import AsanaImg from "../img/connector-asana.png";
import AutomationImg from "../img/connector-automation.png";
import AzureaiImg from "../img/connector-openai.png";
import BluePrismImg from "../img/connector-blueprism.png";
import CamundaImg from "../img/connector-camunda.png";
import EasypostImg from "../img/connector-easypost.png";
import GithubImg from "../img/connector-github.png";
import GitlabImg from "../img/connector-gitlab.png";
import GoogleDriveImg from "../img/connector-google-drive.png";

const SearchableTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const connectors = [
    {
      name: "Example",
      description:
        "Interact with Amazon Bedrock from your BPMN process to experiment with and evaluate foundation models (FMs) from leading AI companies.",
      type: "Outbound",
      link: "../example-template",
      image: AsanaImg,
    },
    {
      name: "Amazon Bedrock",
      description:
        "Interact with Amazon Bedrock from your BPMN process to experiment with and evaluate foundation models (FMs) from leading AI companies.",
      type: "Outbound",
      link: "../amazon-bedrock",
      image: AmazonBedrockImg,
    },
    {
      name: "Amazon Comprehend",
      description:
        "Interact with the Amazon Comprehend service from your BPMN process.",
      type: "Outbound",
      link: "../amazon-comprehend",
      image: AmazonBedrockImg,
    },
    {
      name: "Amazon DynamoDB",
      description:
        "Interact with Amazon DynamoDB NoSQL database service within your BPMN process, enabling you to store and retrieve data from tables, as well as perform queries and scans.",
      type: "Outbound",
      link: "../amazon-dynamodb/",
      image: AmazonDynamoImg,
    },
    {
      name: "Amazon EventBridge Service",
      description:
        "Send events using Amazon EventBridge service within your BPMN process.",
      type: "Outbound",
      link: "../amazon-eventbridge/",
      image: AmazonEventbridgeImg,
    },
    {
      name: "Amazon EventBridge Webhook",
      description:
        "Start a BPMN process instance triggered by an Amazon EventBridge service event.",
      type: "Inbound",
      link: "../amazon-eventbridge/",
      image: AmazonEventbridgeImg,
    },
    {
      name: "AWS Lambda Connector",
      description: "Invoke AWS Lambda Functions from your BPMN process.",
      type: "Outbound",
      link: "../aws-lambda/",
      image: AmazonLambdaImg,
    },
    {
      name: "Amazon SageMaker Connector",
      description:
        "Interact with the Amazon SageMaker service from your BPMN process.",
      type: "Outbound",
      link: "../amazon-sagemaker/",
      image: AmazonBedrockImg,
    },
    {
      name: "Amazon SNS inbound Connector",
      description:
        "Trigger your BPMN process with an Amazon Simple Notification Service notification via HTTPS.",
      type: "Inbound",
      link: "../amazon-sns/",
      image: AmazonSnsImg,
    },
    {
      name: "Amazon SNS Outbound Connector",
      description:
        "Send messages to Amazon Simple Notification Service from your BPMN process.",
      type: "Outbound",
      link: "../amazon-sns/",
      image: AmazonSnsImg,
    },
    {
      name: "Amazon SQS Connector",
      description:
        "Send messages to Amazon Simple Queue Service from your BPMN process.",
      type: "Outbound",
      link: "../amazon-sqs/",
      image: AmazonSqsImg,
    },
    {
      name: "Amazon SQS Connector",
      description:
        "Receive messages from Amazon Simple Queue Service (SQS) in your BPMN process.",
      type: "Inbound",
      link: "../amazon-sqs/",
      image: AmazonSqsImg,
    },
    {
      name: "Amazon Textract Connector",
      description:
        "Interact with the Amazon Textract Service from your BPMN process.",
      type: "Outbound",
      link: "../amazon-textract/",
      image: AmazonBedrockImg,
    },
    {
      name: "Asana Connector",
      description: "Manage Asana projects and tasks from your BPMN process.",
      type: "Outbound",
      link: "../asana/",
      image: AsanaImg,
    },
    {
      name: "Automation Anywhere Connector",
      description:
        "Orchestrate your Automation Anywhere queue from your BPMN process.",
      type: "Outbound",
      link: "../automation-anywhere/",
      image: AutomationImg,
    },
    {
      name: "Azure OpenAI",
      description: "Interact with Azure OpenAI from your BPMN process.",
      type: "Outbound",
      link: "../azure-open-ai/",
      image: AzureaiImg,
    },
    {
      name: "Blue Prism",
      description:
        "Orchestrate your Blue Prism queue items from your BPMN process.",
      type: "Outbound",
      link: "../blueprism/",
      image: BluePrismImg,
    },
    {
      name: "Camunda Operate Connector",
      description: "Fetch process execution data from Camunda Operate.",
      type: "Outbound",
      link: "../operate/",
      image: CamundaImg,
    },
    {
      name: "Easy Post Connector",
      description:
        "Create addresses, parcels, and shipments, as well as purchase and verify shipments with EasyPost from your BPMN process.",
      type: "Outbound",
      link: "../easypost/",
      image: EasypostImg,
    },
    {
      name: "GitHub Connector",
      description: "Manage GitHub issues and releases from your BPMN process.",
      type: "Outbound",
      link: "../github/",
      image: GithubImg,
    },
    {
      name: "GitHub Webhook Connector",
      description: "Start a process instance triggered by a GitHub event.",
      type: "Inbound",
      link: "../github/",
      image: GithubImg,
    },
    {
      name: "GitLab Connector",
      description: "Manage GitLab issues and releases from your BPMN process.",
      type: "Outbound",
      link: "../gitlab/",
      image: GitlabImg,
    },
    {
      name: "Google Drive Connector",
      description:
        "Create folders or files from a Google Drive template from your BPMN process.",
      type: "Outbound",
      link: "../googledrive/",
      image: GoogleDriveImg,
    },
    {
      name: "Google Maps Platform Connector",
      description:
        "Validate addresses, retrieve postal addresses, and calculate distances with Google Maps Platform Service from your BPMN process.",
      type: "Outbound",
      link: "../google-maps-platform/",
      image: AmazonBedrockImg,
    },
    {
      name: "Google Sheets Connector",
      description:
        "Allows you to work with an existing or new empty spreadsheet on Google Drive from your BPMN process.",
      type: "Outbound",
      link: "../google-sheets/",
      image: AmazonBedrockImg,
    },
    {
      name: "GraphQL Connector",
      description:
        "Execute a GraphQL query or mutation from your BPMN process.",
      type: "Outbound",
      link: "../graphql/",
      image: AmazonBedrockImg,
    },
    {
      name: "HTTP Webhook Connector",
      description:
        "Start a process instance with your custom webhook configuration.",
      type: "Outbound",
      link: "../http-webhook/",
      image: AmazonBedrockImg,
    },
    {
      name: "Hugging Face Connector",
      description: "Interact with Hugging Face models from your BPMN process.",
      type: "Outbound",
      link: "../hugging-face/",
      image: AmazonBedrockImg,
    },
    {
      name: "Kafka Consumer Connector",
      description: "Consume messages from Kafka from your BPMN process.",
      type: "Inbound",
      link: "../kafka/",
      image: AmazonBedrockImg,
    },
    {
      name: "Kafka Producer Connector",
      description: "Produce messages to Kafka from your BPMN process.",
      type: "Outbound",
      link: "../kafka/",
      image: AmazonBedrockImg,
    },
    {
      name: "Microsoft 365 Connector",
      description:
        "Interactions with Microsoft 365 mail from your BPMN process.",
      type: "Outbound",
      link: "../microsoft-o365-mail/",
      image: AmazonBedrockImg,
    },
    {
      name: "Microsoft Teams Connector",
      description: "Interactions with Microsoft Teams from your BPMN process.",
      type: "Outbound",
      link: "../microsoft-teams/",
      image: AmazonBedrockImg,
    },
    {
      name: "OpenAI Connector",
      description: "Interact with ChatGPT and OpenAI Moderation API.",
      type: "Outbound",
      link: "../openai/",
      image: AmazonBedrockImg,
    },
    {
      name: "Polling Connector",
      description:
        "The HTTP Polling Connector polls an endpoint at regular intervals, enabling periodic data fetching as an intermediate step in your BPMN processes.",
      type: "Outbound",
      link: "../polling/",
      image: AmazonBedrockImg,
    },
    {
      name: "RabbitMQ Consumer Connector",
      description: "Receive messages from RabbitMQ in your BPMN process.",
      type: "Inbound",
      link: "../rabbitmq-outbound/",
      image: AmazonBedrockImg,
    },
    {
      name: "RabbitMQ Producer Connector",
      description: "Send messages to RabbitMQ from your BPMN process.",
      type: "Outbound",
      link: "../rabbitmq-outbound/",
      image: AmazonBedrockImg,
    },
    {
      name: "REST Connector",
      description:
        "Make a request to a REST API and use the response in the next steps of your process.",
      type: "Outbound",
      link: "../rest/",
      image: AmazonBedrockImg,
    },
    {
      name: "Salesforce Connector",
      description: "Manage your Salesforce instance from your BPMN process.",
      type: "Outbound",
      link: "../salesforce/",
      image: AmazonBedrockImg,
    },
    {
      name: "SendGrid Connector",
      description: "Quickly send emails from your BPMN processes.",
      type: "Outbound",
      link: "../sendgrid/",
      image: AmazonBedrockImg,
    },
    {
      name: "Slack inbound Connector",
      description:
        "Trigger a Slack bot to start a BPMN process with an event or a slash command.",
      type: "Inbound",
      link: "../slack/",
      image: AmazonBedrockImg,
    },
    {
      name: "Slack outbound Connector",
      description:
        "Send messages to channels or users in your Slack workspace from your BPMN process.",
      type: "Outbound",
      link: "../slack/",
      image: AmazonBedrockImg,
    },
    {
      name: "SOAP Connector",
      description:
        "Connect your BPMN process with Simple Object Access Protocol (SOAP) services and interact with SOAP service endpoints.",
      type: "Outbound",
      link: "../soap/",
      image: AmazonBedrockImg,
    },
    {
      name: "SQL Connector",
      description:
        "Connect your BPMN process with SQL databases (Microsoft SQL Server, PostgreSQL, MySQL).",
      type: "Outbound",
      link: "../sql/",
      image: AmazonBedrockImg,
    },
    {
      name: "Twilio Connector",
      description:
        "Send and get SMS messages with Twilio service from your BPMN process.",
      type: "Outbound",
      link: "../twilio/",
      image: AmazonBedrockImg,
    },
    {
      name: "Twilio Webhook Connector",
      description:
        "Start a process instance triggered by a Twilio webhook. Can be used as an intermediate Connector in existing processes.",
      type: "Inbound",
      link: "../twilio/",
      image: AmazonBedrockImg,
    },
    {
      name: "UiPath Connector",
      description: "Orchestrate your UiPath Bots with Camunda.",
      type: "Outbound",
      link: "../uipath/",
      image: AmazonBedrockImg,
    },
    {
      name: "WhatsApp Connector",
      description:
        "Send messages with WhatsApp Business from your BPMN process.",
      type: "Outbound",
      link: "../whatsapp/",
      image: AmazonBedrockImg,
    },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterType = (event) => {
    setFilterType(event.target.value);
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
      &nbsp;&nbsp;&nbsp;&nbsp;Connector type:&nbsp;&nbsp;
      <select value={filterType} onChange={handleFilterType}>
        <option value="All">All</option>
        <option value="Inbound">Inbound</option>
        <option value="Outbound">Outbound</option>
      </select>
      {filteredConnectors.length > 0 ? (
        <table className="no-border-table">
          <thead>
            <tr>
              <th>Connector</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredConnectors.map((connector, index) => (
              <tr key={index}>
                <td className="no-border-cell-img">
                  <div className="connector-cell">
                    <div className="connector-image">
                      <img src={connector.image} alt={connector.name} />
                    </div>
                    <div className="connector-name">
                      <a href={connector.link}>{connector.name}</a>
                    </div>
                  </div>
                </td>
                <td className="no-border-cell">{connector.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="connector-no-results">
          No Connectors found for that search term and type. Try a different
          search, remove the type, or check your spelling.
        </p>
      )}
    </div>
  );
};

export default SearchableTable;
