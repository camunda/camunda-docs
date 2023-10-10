# Generating Optimize sidebars

## Why?

With the Optimize docs living in their own docusaurus docs instance, we need to synchronize sidebar definitions across both instances. This provides a stable left nav for the user.

Unfortunately docusaurus instances do not have access to each other's documents, so any links that cross instances need to be defined as URLs instead of document IDs.

This script crawls the left nav of the site you're viewing, and generates a sidebar definition file full of URL-based links. It needs to be corrected for links that are _within_ the `optimize` docs instance, because it's not smart enough to generate doc-based links for them, but it prevents us from having to manually identify every page title/URL in the main `docs` instance.

The script is run in the browser dev tools console, and the results are pasted into [a sidebars file](../howtos/versioning.md#structure).

The script might require small tweaks depending on which instance you are generating sidebars for, and which version.

## How?

1. Visit docs.camunda.io
2. Fully expand the entire left nav

   Docusaurus doesn't emit all levels of the nav on initial render. Nested levels get emitted only when they're viewed (i.e. you expand their parent section).

   The sidebar generation script operates on the DOM. Any levels of the nav that aren't in the DOM yet won't be included in the generated items.

   The following script can be run in your browser dev tools, when viewing the documentation, to expand all categories in the left navigation:

   ```javascript
   const count = () =>
     document.querySelectorAll(".menu__link--sublist[aria-expanded=false]")
       .length;
   const expand = () =>
     document
       .querySelectorAll(".menu__link--sublist[aria-expanded=false]")
       .forEach((x) => x.click());
   async function expandAll() {
     while (count() > 0) {
       expand();
       await new Promise((resolve) => setTimeout(resolve, 500));
     }
   }
   await expandAll();
   ```

3. Paste the contents of generateOptimizeSidebars.js into your browser dev tools console

   - Edit the config settings at the top appropriately:

     - **`generateJSONorJS`**: If generating the "next" version's sidebar, set to "JS". If generating any other version's sidebar, set to "JSON".
       Generating .js instead of .json is preferred, because it allows us to abstract the version's base URL...but Docusaurus only supports .js files for the "next" version's sidebar. All others must be .json.
     - **`docsAndVersionUrlPrefix`**: This value will be stripped from all generated URLs, so that the `optimize_sidebars.js` file can prepend the correct version in only one place instead of every single link. This will help us avoid a large find/replace when versioning optimize docs.

       Note that this setting only has an effect when generating .js instead of .json.

   - The last statement of the script copies the generated sidebars into your clipboard.

4. Paste the results into the optimize_sidebars.js file for the "next" version, or the appropriate versioned sidebars.json file in optimize_versioned_sidebars

   - When generating .js, the results do not include the statement `module.exports = `, so leave that part in 😅.

   - Make sure the results get formatted, as the script generates an object that does not match prettier's desired format.

5. Replace/revert any Optimize links that exist within the optimize docs

   The script generates URL-based links for _all_ items in the sidebar; we want doc-based links for the Optimize docs.

   #### Example

   The script generated this link for me:

   ```javascript
       docsComponentsLink(
         "What is Optimize?",
         "components/optimize/what-is-optimize/"
       ),
   ```

   But I revert this to the doc-based link (in shortcut format):

   ```javascript
       "what-is-optimize",
   ```

6. Smoke-test the navigation locally

   Note that sidebars files may not be watched by docusaurus's local server. You might need to restart your local server to pick up changes.
