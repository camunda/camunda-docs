# Generating Optimize sidebars

## Why?

With the Optimize docs living in their own docusaurus docs instance, we need to synchronize sidebar definitions across both instances. This provides a stable left nav for the user.

Unfortunately docusaurus instances do not have access to each other's documents, so any links that cross instances need to be defined as URLs instead of document IDs. See [the docs on sidebar drift](https://github.com/camunda/camunda-docs/blob/main/howtos/versioning.md#sidebar-drift) for further explanation of this limitation.

This script crawls the left nav of the site you're viewing, and generates a sidebar definition file full of URL-based links. These URL-based links should be dropped into the opposite docs instance's sidebar file, so that the sidebar structures match across instances. The generated URL-based links for an instance should be ignored for the sidebar links within that instance. The script is not smart enough to generate doc-based links for sidebar items within an instance, but it prevents us from having to manually identify every sidebar item external to the instance.

The script is run in the browser dev tools console, and the results are pasted into [a sidebars file](../howtos/versioning.md#structure).

## How?

1. Visit docs.camunda.io.
2. Open your browser dev tools and paste the contents of generateOptimizeSidebars.js into the interactive console.
3. Visit several pages and generate sidebar definitions.

   **Which pages to visit**

   You will need to generate definitions on 6 different pages per version:

   - A main docs page under the Components top-navigation category. Example: https://docs.camunda.io/docs/components/
   - A main docs page under the APIs & Clients top-navigation category. Example: https://docs.camunda.io/docs/apis-tools/working-with-apis-tools/
   - A main docs page under the Self-Managed top-navigation category. Example: https://docs.camunda.io/docs/self-managed/about-self-managed/
   - An Optimize page under the Components top-navigation category. Example: https://docs.camunda.io/optimize/components/what-is-optimize/
   - An Optimize page under the APIs & Clients top-navigation category. Example: https://docs.camunda.io/optimize/apis-tools/optimize-api/optimize-api-authorization/
   - An Optimize page under the Self-Managed top-navigation category. Example: https://docs.camunda.io/optimize/self-managed/optimize-deployment/install-and-start/

   This is because the left sidebar only contains links to pages within the same top-navigation category, and there are three top-navigation categories that contain Optimize docs.

   **What the script does**

   1. Identifies the configuration settings for the script, based on the current URL.
   2. Expands all sidebar items on the current page (so that they are available to crawl in the DOM).
   3. Crawls the DOM for all sidebar items, and generates sidebar definitions.
   4. Copies the generated sidebar definitions to your clipboard.

   **Steps for each page**

   1. Execute the script by running `await generateSidebarDefinition()` in the console.
   2. Paste the contents of your clipboard into the _opposite_ instance's corresponding version sidebars file than the page you visited to generate the definitions. If you visited an Optimize v3.11.0 page, the generated definitions should go in the main instance's v8.3 sidebars file. If you visited a main docs v8.2 page, the generated definitions should go in the Optimize instances v3.10.0 sidebars.

      - The generated definitions should not replace the _entire_ sidebar file. They should merge into the existing sidebar file, replacing only the top-navigation category for which they were generated.
      - Make sure the results get formatted, as the script generates an object that does not match prettier's desired format. If they don't appear to format, this is likely a clue that there is a syntax file (e.g. a missed closing bracket).

   3. Replace/revert any same-instance links that were overwritten. These are visiable as a large block of changes in the middle of the diff.
   4. Revert any whitespace-only changes. These are typically visible as a single line change in the diff.
   5. Confirm that the remaining changes are meaningful, and commit them. These are the sidebars items that have drifted due to having multiple docs instances.

4. Smoke-test the navigation locally

   Note that sidebars files may not be watched by docusaurus's local server. You might need to restart your local server to pick up changes.

   There are a few automated tests that you can run against your local server with `npm run test:regression`. You might also want to perform some manual regression testing.
