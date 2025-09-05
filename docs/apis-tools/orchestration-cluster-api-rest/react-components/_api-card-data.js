import InteractiveApiExplorerImg from "./img/interactive-api-explorer-icon.png";
import SwaggerImg from "./img/swagger-icon.png";
import PostmanImg from "./img/postman-icon.png";
import OpenApiImg from "./img/openapi-icon.png";

// API exploration cards for orchestration cluster overview page
export const apiExplorationCards = [
  {
    link: "https://docs.camunda.io/docs/next/apis-tools/orchestration-cluster-api-rest/specifications/orchestration-cluster-rest-api/",
    title: "Interactive REST API Explorer",
    image: InteractiveApiExplorerImg,
    description:
      "View API specifications with available endpoints and examples of requests and responses.",
  },
  {
    link: "../orchestration-cluster-api-rest-swagger",
    title: "Try REST API with Swagger",
    image: SwaggerImg,
    description: "Review and try the REST API endpoints with Swagger UI.",
  },
  {
    link: "https://www.postman.com/camundateam/camunda-8-postman/collection/apl78x9/camunda-8-api-rest",
    title: "Camunda 8 Postman",
    image: PostmanImg,
    description:
      "Check out our collections of APIs, or read on for regular updates and upcoming projects.",
  },
  {
    link: "https://github.com/camunda/camunda/blob/main/zeebe/gateway-protocol/src/main/proto/rest-api.yaml",
    title: "OpenAPI Specification",
    image: OpenApiImg,
    description:
      "Check out the OpenAPI specification to generate your own client or inspect the full schema.",
  },
];
