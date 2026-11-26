// Card content for the landing page hero (src/components/LandingHero).
// The command is from the Camunda 8 Run developer quickstart.
export const selfManagedHero = {
  kind: "code",
  title: "Helm chart",
  meta: "Kubernetes",
  code: `helm install camunda \\
  camunda/camunda-platform \\
  --values values-quick-install.yaml`,
};

export const selfManagedPodsOverlay = {
  kind: "table",
  title: "Pods",
  meta: "camunda",
  rows: [["camunda-zeebe-0", { status: "ok", label: "Running" }]],
};
