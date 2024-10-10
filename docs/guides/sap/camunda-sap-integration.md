# SAP Integration

Camunda's SAP Integration consists of several -in the non-technical sense- packages. Together they live under the umbrella term "SAP Integration", yet each fulfilling a dedicated purpose. Every package of the SAP Integration can be used standalone w/o any interdependencies to the others. They blend into the composable architecture of Camunda for overall process orchestration.

These are the SAP integration packages:

- [SAP OData outbound connector](./odata-connector.md): interact with an S/4HANA or ECC System via OData v2 + v4 APIs, directly from your BPMN model task
- [SAP RFC outbound connector](./rfc-connector.md): query BAPIs and remote-enabled Function Modules on SAP ECC Systems
- [SAP BTP Integration](./btp-integration.md)
  - use Tasklist's forms as Fiori UI
  - operate BTP services from BPMN tasks
  - Inbound proxy endpoint: start Process Instances of BPMN models, including custom variables

They all run in the customer's scope on https://www.sap.com/products/technology-platform.html. The above packages *don't* require proprietary Camunda-related setup, but re-use existing infrastructure, with minimal prerequisites only. Because you know best how to handle your SAP- and BTP-infrastructure. And shared resource usage is not only cost-effective, but aids both your and Camunda's sustainability effort.

(insert diagram from https://docs.google.com/presentation/d/1SgA01ksa6h1I1NPKK1Erd7cjq0hwOW5ulEdVgeQxfQg/edit?usp=sharing here please)
