import React from "react";
import IconFirstAgentImg from "../assets/icon-first-agent.svg";

// Banner linking to the "Build your first AI agent" guide. The relative link
// assumes the host page is directly inside components/agentic-orchestration/.
const AoGetStartedBanner = ({
  href = "../../../guides/getting-started-agentic-orchestration/",
}) => {
  return (
    <div
      className="build-banner"
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        padding: "28px 32px",
        marginTop: "50px",
        border: "1px solid var(--ifm-color-emphasis-300)",
        borderRadius: "12px",
        background: "var(--ifm-background-surface-color)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#5148c6",
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          WebkitMaskImage:
            "linear-gradient(90deg, #000 0%, #000 40%, transparent 85%)",
          maskImage:
            "linear-gradient(90deg, #000 0%, #000 40%, transparent 85%)",
        }}
      ></div>
      <div
        className="build-banner-text"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flex: "0 1 60%",
          minWidth: "280px",
          color: "#ffffff",
        }}
      >
        <IconFirstAgentImg
          role="img"
          aria-hidden="true"
          width="64"
          height="64"
          style={{ flexShrink: 0, color: "#ffffff" }}
        />
        <div>
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "4px",
            }}
          >
            Build your first AI agent
          </div>
          <div style={{ color: "rgba(255, 255, 255, 0.88)" }}>
            Get started with Camunda agentic orchestration by building and
            running your first AI agent.
          </div>
        </div>
      </div>
      <a
        className="button button--primary button--md button--banner"
        style={{ position: "relative" }}
        title="Build your first AI agent"
        href={href}
      >
        Get started
      </a>
    </div>
  );
};

export default AoGetStartedBanner;
