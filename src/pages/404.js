import React from "react";
import Layout from "@theme/Layout";
import NotFoundContent from "@theme/NotFound/Content";

// The page content lives in the swizzled @theme/NotFound/Content component so
// that the static 404.html and the client-side fallback route render the same page.
export default function NotFound() {
  return (
    <Layout title="Page not found">
      <NotFoundContent />
    </Layout>
  );
}
