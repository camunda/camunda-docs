---
id: overview
title: "Overview"
description: "Learn more about Camunda integrations, such as Camunda's SAP integration."
---

Camunda Integrations are capabilities that enable Camunda’s process automation platform to seamlessly interact with various external systems, services, and technologies. By leveraging these integrations, you can design workflows that orchestrate business logic both within Camunda and across other platforms or applications—creating end-to-end process automation solutions.

Currently, this consists of Camunda's SAP integration, including:

- **[CSAP setup command line utility](/components/camunda-integrations/sap/csap-cli.md)**: A command line interface (CLI) tool to configure and deploy all SAP integration artifacts.
- **[SAP OData Connector](/components/camunda-integrations/sap/odata-connector.md)**: A protocol and outbound Connector that runs as a Docker image on the SAP Business Technology Platform (BTP)..
- **[Business Technology Platform (BTP) plugin](/components/camunda-integrations/sap/btp-plugin.md)**: An artifact deployed on SAP BTP that connects to Camunda 8 SaaS, providing:
  1.  A generic Fiori app to start BPMN processes and display [Camunda Forms](/components/modeler/forms/camunda-forms-reference.md) in the Fiori design language.
  2.  Selective exposure of SAP BTP services for [BPMN tasks](/components/modeler/bpmn/bpmn.md) enabling bidirectional integration.
  3.  A generic endpoint for initiating BPMN processes.
- **[SAP RFC Connector](/components/camunda-integrations/sap/rfc-connector.md)**: A Java Spring Boot application that runs on SAP BTP.
