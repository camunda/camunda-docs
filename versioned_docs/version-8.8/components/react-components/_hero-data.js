// Card content for the landing page hero (src/components/LandingHero).
// Illustrative content only.
export const agenticOrchestrationHero = {
  kind: "flow",
  title: "Refund request",
  meta: "Process instance",
  steps: [
    {
      label: "Get order",
      role: "system",
      state: "done",
      note: "Service task, completed",
    },
    {
      label: "AI agent",
      role: "agent",
      state: "active",
      note: "Ad-hoc sub-process, running",
      adhoc: true,
    },
    {
      label: "Review",
      role: "people",
      state: "next",
      note: "User task, not started",
    },
  ],
};

export const usingCamundaHero = {
  kind: "modeler",
  title: "Process",
  meta: "BPMN",
  task: "Review",
};
