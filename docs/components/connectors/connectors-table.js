import React, { useState } from "react";
import "./SearchableTable.css"; // Import the CSS file for styling

const SearchableTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const connectors = [
    {
      name: "Amazon Bedrock Connector",
      description:
        "Interact with Amazon Bedrock from your BPMN process to experiment with and evaluate foundation models (FMs) from leading AI companies.",
      type: "Protocol",
      link: "../out-of-the-box-connectors/amazon-bedrock",
      image: "./img/connector-amazon-bedrock.png", // Updated path
    },
    {
      name: "Amazon Comprehend Connector",
      description:
        "Interact with the Amazon Comprehend service from your BPMN process.",
      type: "Inbound",
      link: "../out-of-the-box-connectors/amazon-comprehend.md",
      image: "./img/connector-amazon-comprehend.png", // Updated path
    },
    {
      name: "Amazon DynamoDB Connector",
      description:
        "Interact with Amazon DynamoDB NoSQL database service within your BPMN process, enabling you to store and retrieve data from tables, as well as perform queries and scans.",
      type: "Outbound",
      link: "../out-of-the-box-connectors/amazon-dynamodb.md",
      image: "./img/connector-amazon-dynamodb.png", // Updated path
    },
    // Add more connectors as needed
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
    <div>
      <input
        type="text"
        placeholder="Search for connectors.."
        value={searchTerm}
        onChange={handleSearch}
      />
      <select value={filterType} onChange={handleFilterType}>
        <option value="All">All</option>
        <option value="Protocol">Protocol</option>
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
                <td
                  className="no-border-cell"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={connector.image}
                    alt={connector.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  <a href={connector.link}>{connector.name}</a>
                </td>
                <td className="no-border-cell">{connector.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchableTable;
