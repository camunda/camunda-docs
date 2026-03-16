// src/pages/docs/developers/index.tsx (or .js)
import React from "react";
import Layout from "@theme/Layout";

export default function DevelopersLanding() {
  return (
    <Layout
      title="Developers"
      description="Developer entry point that's not versioned"
    >
      <main className="container margin-vert--lg">
        <h1>Developers</h1>
        <p>Evergreen developer landing page content goes here.</p>

        {/* Example links into your actual docs */}
        {/* <Link to="/docs/8.8/apis-tools/...">Camunda 8.8 API docs</Link> */}
      </main>
    </Layout>
  );
}
