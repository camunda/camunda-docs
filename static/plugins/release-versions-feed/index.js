// Plugin to generate RSS feed for release versions
const {
  mkdirSync,
  writeFileSync,
  readFileSync,
  existsSync,
} = require("node:fs");
const { resolve, dirname, join } = require("node:path");
const cheerio = require("cheerio");

module.exports = function releaseVersionsFeedPlugin(_context, opts = {}) {
  const {
    url, // Required - must be provided in config
    contextPath = "/",
    maxItems = 50,
  } = opts;

  if (!url) {
    throw new Error(
      "[release-versions-feed-plugin] url is required in plugin options"
    );
  }

  /**
   * Parse HTML content to extract individual release entries.
   * Each release is an h3 with id matching YYYY-MM-DD.
   */
  function parseReleases(htmlContent, pagePath) {
    const $ = cheerio.load(htmlContent);
    const releases = [];
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    $("h3[id]").each((_, elem) => {
      const $heading = $(elem);
      const id = $heading.attr("id");
      if (!datePattern.test(id)) return;

      // Collect content until the next h3[id] or h2
      let $current = $heading;
      let sectionHtml = "";

      while ($current.next().length) {
        const $next = $current.next();
        if ($next.is("h3[id], h2")) break;
        $current = $next;
        sectionHtml += $current.clone().wrap("<div>").parent().html();
      }

      const $section = cheerio.load(sectionHtml);

      // Extract SaaS / Helm versions from the first <p> in the section
      const metaText = $section("p").first().text().trim();

      // Clean HTML for feed content
      $section("a.hash-link").remove();
      $section("*").removeAttr("class translate style");
      $section('a[href^="/"]').each((_, link) => {
        const href = $section(link).attr("href");
        $section(link).attr("href", `${url}${href}`);
      });

      const fullContent = $section("body").html() || "";

      releases.push({
        date: id,
        metaText,
        fullContent,
        link: `${url}${contextPath}${pagePath.replace(/^\//, "")}#${id}`,
      });
    });

    return releases;
  }

  /**
   * Escape XML special characters
   */
  function escapeXml(s = "") {
    return String(s).replace(
      /[<>&'"]/g,
      (c) =>
        ({
          "<": "&lt;",
          ">": "&gt;",
          "&": "&amp;",
          "'": "&apos;",
          '"': "&quot;",
        })[c]
    );
  }

  /**
   * Format an ISO date string as RFC 2822 (RSS pubDate)
   */
  function toRssDate(isoDate) {
    const [year, month, day] = isoDate.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day)).toUTCString();
  }

  /**
   * Format an ISO date string for display
   */
  function formatDate(isoDate) {
    const [year, month, day] = isoDate.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  /**
   * Generate RSS item for a release
   */
  function generateRssItem(release) {
    const title = `Camunda release — ${formatDate(release.date)}`;
    const description = release.metaText || title;

    const spacedContent = release.fullContent.replace(
      /<\/(h[1-6]|p|div|ul|ol|li)>/g,
      "</$1> "
    );

    return `
<item>
  <title>${escapeXml(title)}</title>
  <link>${escapeXml(release.link)}</link>
  <guid isPermaLink="false">camunda-release-${release.date}</guid>
  <pubDate>${toRssDate(release.date)}</pubDate>
  <description>${escapeXml(description)}</description>
  <content:encoded><![CDATA[${spacedContent}]]></content:encoded>
</item>`;
  }

  /**
   * Generate RSS feed content
   */
  function generateRssFeed(releases, pagePath) {
    const title = "Camunda — Release Versions";
    const description = "Camunda 8 release versions";
    const feedPath = "rss/releases/versions.xml";

    // Sort newest first, then truncate
    const sortedReleases = [...releases]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, maxItems);

    const pageUrl = `${url}${contextPath}${pagePath.replace(/^\//, "")}`;
    const feedUrl = `${url}${contextPath}${feedPath}`;

    const rss =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">\n` +
      `<channel>\n` +
      `<title>${escapeXml(title)}</title>\n` +
      `<link>${escapeXml(pageUrl)}</link>\n` +
      `<description>${escapeXml(description)}</description>\n` +
      `<language>en</language>\n` +
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n` +
      `<ttl>60</ttl>\n` +
      `<docs>http://www.rssboard.org/rss-specification</docs>\n` +
      `<atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />\n` +
      `<image>\n` +
      `<url>${escapeXml(`${url}${contextPath}img/black-C.png`)}</url>\n` +
      `<title>${escapeXml(title)}</title>\n` +
      `<link>${escapeXml(pageUrl)}</link>\n` +
      `</image>\n` +
      sortedReleases.map(generateRssItem).join("") +
      `\n</channel>\n` +
      `</rss>\n`;

    return { feedPath, content: rss, count: sortedReleases.length };
  }

  /**
   * Find the release-versions page in the build directory
   */
  function findReleasePage(buildDir) {
    const filePath = join(
      buildDir,
      "docs",
      "reference",
      "release-versions",
      "index.html"
    );

    if (!existsSync(filePath)) {
      return null;
    }

    return {
      path: "/docs/reference/release-versions/",
      filePath,
    };
  }

  /**
   * Process the release-versions page and generate the RSS feed
   */
  function processReleasePage(page, outDir) {
    const htmlContent = readFileSync(page.filePath, "utf8");
    const releases = parseReleases(htmlContent, page.path);

    if (releases.length === 0) {
      console.log(`[release-versions-feed-plugin] No releases found`);
      return null;
    }

    console.log(
      `[release-versions-feed-plugin] Found ${releases.length} releases`
    );

    const { feedPath, content, count } = generateRssFeed(releases, page.path);

    const fullPath = resolve(outDir, feedPath);
    mkdirSync(dirname(fullPath), { recursive: true });
    writeFileSync(fullPath, content, "utf8");

    console.log(
      `[release-versions-feed-plugin] Generated ${feedPath} with ${count} items`
    );
    return { feedPath, count };
  }

  return {
    name: "release-versions-feed-plugin",

    async postBuild({ outDir }) {
      const page = findReleasePage(outDir);

      if (!page) {
        console.log(
          "[release-versions-feed-plugin] No release-versions page found in build output"
        );
        return;
      }

      try {
        const result = processReleasePage(page, outDir);
        if (result) {
          console.log(
            "[release-versions-feed-plugin] Successfully generated RSS feed"
          );
        }
      } catch (error) {
        console.error(
          "[release-versions-feed-plugin] Error processing releases:",
          error.message
        );
      }
    },
  };
};
