# Notices RSS Feed Plugin

This Docusaurus plugin automatically generates an RSS 2.0 feed for Security Notices from the latest documentation version, with each notice parsed as a separate feed item from the built HTML.

## Features

- **Single feed for latest version**: Generates one RSS feed containing notices from the current documentation
- **Individual notice items**: Parses HTML using Cheerio to extract each security notice as a separate feed item
- **Full content support**: Includes both short descriptions and complete HTML content via `content:encoded`
- **Rich metadata**: Publication date, affected products as categories, stable GUIDs
- **Smart sorting**: Notices sorted by publication date (newest first) with UTC date handling
- **RSS 2.0 compliant**: Includes language, TTL, documentation link, and Atom self-reference
- **Clean HTML**: Removes hash links, class attributes, and style attributes; converts relative URLs to absolute

## Configuration

The plugin is configured in `docusaurus.config.js`:

```javascript
[
  "./static/plugins/notices-feed",
  {
    siteUrl: docsSiteUrl, // Required - no default
    maxItems: 30,
  },
];
```

### Options

- `siteUrl` (string, **required**): The base URL of the documentation site (e.g., `https://docs.camunda.io`)
- `maxItems` (number): Maximum number of notice items to include in the feed (default: 30)

## Output

The plugin generates a single RSS feed:

- `build/rss/security/notices.xml` - Latest version security notices

### Feed Structure

The feed contains:

**Channel metadata:**

- Title: "Camunda Docs — Security Notices"
- Language: `en`
- TTL: `60` minutes
- Documentation link to RSS 2.0 specification
- Atom self-reference link
- Last build date

**Individual RSS items for each security notice:**

- Notice number and title
- Stable GUID: `camunda-security-notice-{number}` (isPermaLink=false)
- Publication date in RFC 822 format (UTC)
- Short description with publication date and affected products
- Category tags for each affected product
- Full HTML content in `content:encoded` (CDATA)
- Direct link to notice anchor (e.g., `#notice-33`)

### Example Item

```xml
<item>
  <title>Notice 33</title>
  <link>https://docs.camunda.io/docs/reference/notices/#notice-33</link>
  <guid isPermaLink="false">camunda-security-notice-33</guid>
  <pubDate>Wed, 22 Oct 2025 00:00:00 GMT</pubDate>
  <description>Notice 33 - Published: October 22, 2025 - Affects: Camunda Orchestration Cluster</description>
  <category>Camunda Orchestration Cluster</category>
  <content:encoded><![CDATA[<h2 id="notice-33">Notice 33</h2><h3 id="publication-date">Publication date</h3>...]]></content:encoded>
</item>
```

## How It Works

1. **Post-build hook**: Runs in the `postBuild` lifecycle after Docusaurus builds the site
2. **File system scanning**: Locates the latest version HTML at `build/docs/reference/notices/index.html`
3. **HTML parsing**: Uses Cheerio (jQuery-like) to parse HTML and extract notices
4. **Notice extraction**: Finds each `h2[id^="notice-"]` and gathers content until the next notice
5. **Metadata parsing**: Extracts publication date and affected products from structured headings
6. **HTML cleaning**: Removes hash links, attributes (class, translate, style), converts relative to absolute URLs
7. **Date handling**: Parses dates with ordinal suffix support (e.g., "7th") and treats as UTC midnight
8. **Feed generation**: Creates RSS 2.0 XML with proper namespaces and escaping
9. **File output**: Writes feed to `build/rss/security/` directory

## Usage

The feed is generated automatically during `npm run build`. No manual intervention is required.

Subscribe to the feed:

- `https://docs.camunda.io/rss/security/notices.xml`

## Technical Details

- **Parser**: Cheerio for robust HTML/DOM manipulation
- **Date parsing**: Handles various formats with UTC normalization to avoid timezone issues
- **XML escaping**: Proper escaping of special characters in XML content
- **Namespaces**: Uses `xmlns:atom` for self-reference and `xmlns:content` for full HTML content
- **Content format**: HTML fragments (not full documents) in CDATA sections
- **Version scope**: Only processes the latest documentation version (not versioned docs)
