import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export default (function analyticsModule() {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }
  return {
    onRouteUpdate() {
      setTimeout(function () {
        // re-render all BPMN JS files when the user navigated to a different page
        renderAllBpmnJs();
      }, 0);
    },
  };
})();
