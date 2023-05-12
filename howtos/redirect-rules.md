# Guide to Writing Redirect Rules

Since the docs are always changing, it's possible for users to bookmark or share links to pages that move. To ensure that these users can still find their content, we use redirect rules to map old URLs to new URLs.

Redirect rules are written in the [Apache .htaccess format]. The rules are applied to the production and staging sites, but not to the local development environment. All redirect rules are stored in the [.htaccess](../static/.htaccess) file.

The `build-docs` workflow of each PR runs a step to verify that all links present in the production sitemap are still valid. When your build fails on a link validation step, it likely means you moved a doc and did not add a redirect rule that matches the original path.

## Redirect rule guidelines

### Basic structure of a redirect rule

Redirect rules are written in the [Apache .htaccess format]. The basic structure of a redirect rule is:

```apache
RewriteRule ^old/path$ /new/path/ [options]
```

- `^old/path$` defines the path that the user is requesting. This is a regular expression, so you can use wildcards and other regex features. The old path always begins with `^` ("start of string") and ends with `$` ("end of string").
- `/new/path` defines the path that the user should be redirected to. This path should begin with a leading slash, and probably end with a trailing slash.
- `[options]` is an optional list of flags that modify the behavior of the redirect rule. Our rules always use [the `R=301` flag](https://httpd.apache.org/docs/current/rewrite/flags.html#flag_r) and [the `L` flag](https://httpd.apache.org/docs/current/rewrite/flags.html#flag_l). They occasionally use other flags.

You'll find many examples of redirect rules in the `.htaccess` file. Following are some guidelines to help you write new rules.

### Order rules by version descending

Add rules to the top of the `.htaccess` file, or co-located with rules for the same version of the docs. This prevents old rules from accidentally overriding new rules. It also makes it easier for maintainers to identify rules that might be ready for pruning.

### Target the correct versions

Redirect rules must target the correct versions of the docs. See [the Documentation Guidelines](./documentation-guidelines.md#versions) for details on which versions are affected by which source files.

#### Targeting multiple versions

If your rule affects multiple versions, you can handle this in two ways:

1. Write one rule for each version, with the version hardcoded in the path. Example:

   ```apache
   RewriteRule ^docs/next/old/path/?$ /docs/next/new/path/ [R=301,L]
   RewriteRule ^docs/old/path/?$ /docs/new/path/ [R=301,L]
   RewriteRule ^docs/8.1/old/path/?$ /docs/8.1/new/path/ [R=301,L]
   ```

   Each rule matches a specific version, and redirects to the new path for that version.

2. Write one rule that uses [regular expression capture groups](https://javascript.info/regexp-groups) to match multiple versions. Example:

   ```apache
   RewriteRule ^docs(/(8.1|next))?/old/path/?$ /docs$1/new/path/ [R=301,L]
   ```

   This rule matches the paths `/docs/old/path/`, `/docs/8.1/old/path/`, and `/docs/next/old/path/`. It captures the optional version number as the first capture group, and injects that value into the redirect path.

### Target the appropriate hierarchy level

Take into consideration whether you're targeting a specific leaf page with no children, or a parent page with children.

#### Targeting a leaf page

If the old path has no children, target the page directly, allowing only for an optional trailing slash.

Example:

```apache
RewriteRule ^old/path/?$ /new/path/ [R=301,L]
```

- This rule matches `/old/path` and `/old/path/`, but not `/old/path/with/children`. The `/?` at the end of the old path specifies an optional trailing slash.
- Avoid using `(.*)` at the end of the old path for leaf pages. There are no routes that could possibly match, and the additional complexity can be confusing.

#### Targeting a parent page

If the old path has children, target the parent page and any children, allowing for an optional trailing slash.

Example:

```apache
RewriteRule ^old/path/?(.*)$ /new/path/$1 [R=301,L]
```

- This rule matches `/old/path`, `/old/path/`, and `/old/path/with/children/`. The `(.*)` at the end of the old path matches any characters after the parent path, and injects them into the redirect path.

### Redirect to the most accurate page section

If the best location for moved content is a specific section of a page, redirect to that section by including the anchor in the new path.

Note that you'll need to use [the `NE` flag](https://httpd.apache.org/docs/current/rewrite/flags.html#flag_ne) to prevent the redirect from encoding the `#` character.

Example:

```apache
RewriteRule ^old/path/?$ /new/path/#with-section [R=301,L,NE]
```

### Avoid redirect chains

Redirect rules should redirect to the final destination, rather than another URL that redirects.

Redirect chains can appear in our rules in two ways:

1. Old redirect rules redirecting to new redirect rules

   When adding a new rule, confirm that no previous rules map to the old path of your new rule. If they do, rewrite them so that they map instead to the new path of your new rule. For example, the second rule in this example should be rewritten to redirect to `/new/path/` instead of `/middle/path/`:

   ````apache
   RewriteRule ^middle/path/?$ /new/path/ [R=301,L]
   RewriteRule ^old/path/?$ /middle/path/ [R=301,L]
   ```apache

   ````

2. Relying on built-in Apache behavior to redirect new paths that lack a trailing slash

   When a URL does not include a trailing slash, the Apache webserver will automatically redirect to the same URL with a trailing slash. This is handy for users, but when our redirects rely on it, it results in a double hop for the user. We should explicitly redirect to the correct URL, including the trailing slash.

   Example of a redirect that will double-hop from `/new/path` to `/new/path/`:

   ```apache
   RewriteRule ^old/path/?$ /new/path [R=301,L]
   ```

   Example of a redirect that will not double-hop:

   ```apache
   RewriteRule ^old/path/?$ /new/path/ [R=301,L]
   ```

## Testing redirect rules

The `.htaccess` file contains redirect rules that are applied to the published site, but it has no effect when running docusaurus locally (via `npm start`).

If you wish to test `.htaccess` rules, you have a couple options:

1. Use online tooling to test rules.
   Tools like https://htaccess.madewithlove.com/ apply a set of redirect rules to a specific URL. Note that there are edge cases where this tool doesn't give the same results as a published environment.

2. Use `docker compose` to spin up a locally-running Apache webserver.
   This repo includes Docker configuration ([Dockerfile](../Dockerfile) and [docker-compose.yml](../docker-compose.yml)) to spin up a local environment that better simulates a published environment. Redirect rules can then be tested directly in a browser.

   The local server is based on the contents of your `./build` folder.

   **To start the local server**:

   1. Build the docs with `npm run build`.
   2. Start the server with `docker compose up`.
   3. Browse http://localhost:3001 and test redirects.

      It is probably best to do this in an incognito browser session, as browsers clutch tightly to 301 redirects.

   4. Clean up the server with `docker compose down`.

   **If you make changes and want to re-start the server**:

   1. Apply the changes to your `build` folder, either manually or by re-running `npm run build`.
   2. Rebuild the environment with `docker compose build`.
   3. Re-start the server with `docker compose up`.
   4. Clean up the server with `docker compose down`.

[Apache .htaccess format]: https://httpd.apache.org/docs/current/howto/htaccess.html
