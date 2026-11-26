// Card content for the landing page hero (src/components/LandingHero).
// Illustrative content only.
export const apisToolsHero = {
  kind: "code",
  title: "Java client",
  meta: "CamundaClient",
  code: `client.newTopologyRequest()
  .send().join();`,
  status: { status: "ok", label: "Connected" },
  result: "Topology received",
};

export const apisToolsRestOverlay = {
  kind: "request",
  method: "GET",
  path: "/v2/topology",
  status: { status: "ok", label: "200" },
  result: "Topology received",
};
