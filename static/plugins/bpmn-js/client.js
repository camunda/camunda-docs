import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

/**
 * Docusaurus client module for BPMN/DMN diagram rendering. Ensures diagrams are
 * re-rendered on every route update in the browser.
 */
const clientModule = {
  onRouteDidUpdate() {
    requestAnimationFrame(() => {
      // Re-render all BPMN/DMN diagrams after navigation
      if (typeof renderDiagrams === "function") {
        renderDiagrams();
      }
    });
  },
};

// Export only in the browser
export default ExecutionEnvironment.canUseDOM ? clientModule : undefined;
