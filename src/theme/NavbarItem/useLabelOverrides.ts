import { useActivePlugin } from "@docusaurus/plugin-content-docs/client";

/** Overrides the NavBar label for version "Next". */
export function useLabelOverrides(label: string): string {
  if (label === "Next") {
    const nextLabels = {
      default: "8.8 (unreleased)",
      optimize: "8.8 / 3.16.0 (unreleased)",
    };

    const { pluginId } = useActivePlugin()!;
    return nextLabels[pluginId] || "Next";
  }

  return label;
}
