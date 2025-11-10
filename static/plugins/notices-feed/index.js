// Plugin to generate RSS feeds for security notices
const {
  mkdirSync,
  writeFileSync,
  readFileSync,
  existsSync,
} = require("node:fs");
const { resolve, dirname, join } = require("node:path");
const cheerio = require("cheerio");

module.exports = function noticesFeedPlugin(_context, opts = {}) {
  const {
    url, // Required - must be provided in config
    contextPath = "/",
    maxItems = 30,
  } = opts;

  if (!url) {
    throw new Error("[notices-feed-plugin] url is required in plugin options");
  }

  /**
   * Parse HTML content to extract individual notices using Cheerio
   * Each notice is an h2 with id=notice-N
   */
  function parseNotices(htmlContent, pagePath) {
    const $ = cheerio.load(htmlContent);
    const notices = [];

    $('h2[id^="notice-"]').each((_, elem) => {
      const $heading = $(elem);
      const noticeNumber = $heading.attr("id").replace("notice-", "");

      // Get all content until the next notice heading
      let $current = $heading;
      let sectionHtml = $heading.clone().wrap("<div>").parent().html();

      while (
        $current.next().length &&
        !$current.next().is('h2[id^="notice-"]')
      ) {
        $current = $current.next();
        sectionHtml += $current.clone().wrap("<div>").parent().html();
      }

      // Parse notice content
      const $notice = cheerio.load(sectionHtml);

      // Extract publication date
      const publicationDate =
        $notice('h3[id="publication-date"], h3[id^="publication-date-"]')
          .next("p")
          .text()
          .trim() || null;

      // Extract products affected
      const products = [];
      const productsSection = $notice(
        'h3[id="products-affected"], h3[id^="products-affected-"]'
      );

      if (productsSection.length > 0) {
        // Check if products are in a list (newer format)
        const productsList = productsSection.next("ul");
        if (productsList.length > 0) {
          productsList.find("li").each((_, li) => {
            products.push($notice(li).text().trim());
          });
        } else {
          // Older format: products in a paragraph
          const productsP = productsSection.next("p");
          if (productsP.length > 0) {
            products.push(productsP.text().trim());
          }
        }
      }

      // Extract impact summary for description
      const impactText = $notice('h3[id="impact"], h3[id^="impact-"]')
        .next("p")
        .text()
        .trim();
      const impactSummary =
        impactText.substring(0, 200) + (impactText.length > 200 ? "..." : "");

      // Clean HTML: remove redundant sections for better UX
      $notice('h2[id^="notice-"]').remove(); // Remove notice heading (already in title)

      // Remove publication date section (heading + paragraph)
      $notice('h3[id="publication-date"], h3[id^="publication-date-"]').each(
        (_, elem) => {
          $notice(elem).next("p").remove();
          $notice(elem).remove();
        }
      );

      // Remove products affected section (heading + list or paragraph)
      $notice('h3[id="products-affected"], h3[id^="products-affected-"]').each(
        (_, elem) => {
          const nextElem = $notice(elem).next();
          if (nextElem.is("ul") || nextElem.is("p")) {
            nextElem.remove();
          }
          $notice(elem).remove();
        }
      );

      // Remove Impact heading (keep the content, just remove the heading label)
      $notice('h3[id="impact"], h3[id^="impact-"]').remove();

      // Clean HTML: remove hash links, attributes, and convert relative URLs to absolute
      $notice("a.hash-link").remove();
      $notice("*").removeAttr("class translate style");
      $notice('a[href^="/"]').each((_, link) => {
        const href = $notice(link).attr("href");
        $notice(link).attr("href", `${url}${href}`);
      });

      // Get HTML fragment (without html/head/body wrapper)
      const fullContent = $notice("body").html() || $notice.html().trim();

      notices.push({
        number: noticeNumber,
        title: `Notice ${noticeNumber}`,
        publicationDate,
        products,
        impactSummary,
        fullContent,
        link: `${url}${contextPath}${pagePath.replace(/^\//, "")}#notice-${noticeNumber}`,
      });
    });

    return notices;
  }

  /**
   * Parse a date string and return a Date object in UTC
   */
  function parsePublicationDate(dateStr) {
    if (!dateStr) return new Date();

    // Remove ordinal suffixes and parse as UTC midnight
    const cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/g, "$1");
    const parsed = new Date(`${cleaned} 00:00:00 GMT`);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
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
   * Generate RSS item for a notice
   */
  function generateRssItem(notice) {
    const pubDate = parsePublicationDate(notice.publicationDate).toUTCString();

    // Use impact summary as description if available, otherwise fallback to metadata
    let description = notice.impactSummary || `Notice ${notice.number}`;
    if (!notice.impactSummary) {
      if (notice.publicationDate)
        description += ` - Published: ${notice.publicationDate}`;
      if (notice.products.length > 0)
        description += ` - Affects: ${notice.products.join(", ")}`;
    }

    const categories = notice.products
      .map((product) => `  <category>${escapeXml(product)}</category>`)
      .join("\n");

    // Add spacing after block-level HTML elements for better text extraction
    const spacedContent = notice.fullContent.replace(
      /<\/(h[1-6]|p|div|ul|ol|li)>/g,
      "</$1> "
    );

    return `
<item>
  <title>${escapeXml(notice.title)}</title>
  <link>${escapeXml(notice.link)}</link>
  <guid isPermaLink="false">camunda-security-notice-${notice.number}</guid>
  <pubDate>${pubDate}</pubDate>
  <description>${escapeXml(description)}</description>
${categories}
  <content:encoded><![CDATA[${spacedContent}]]></content:encoded>
</item>`;
  }

  /**
   * Generate RSS feed content
   */
  function generateRssFeed(notices, pagePath) {
    const title = `Camunda — Security Notices`;
    const description = `Security notices for Camunda 8`;
    const feedPath = `rss/security/notices.xml`;

    // Sort by publication date (newest first), then by notice number (highest first)
    const sortedNotices = [...notices]
      .sort((a, b) => {
        const dateA = parsePublicationDate(a.publicationDate);
        const dateB = parsePublicationDate(b.publicationDate);
        const dateDiff = dateB - dateA;

        // If dates are the same, sort by notice number (descending)
        if (dateDiff === 0) {
          return parseInt(b.number) - parseInt(a.number);
        }

        return dateDiff;
      })
      .slice(0, maxItems);

    const rss =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">\n` +
      `<channel>\n` +
      `<title>${escapeXml(title)}</title>\n` +
      `<link>${escapeXml(`${url}${contextPath}${pagePath.replace(/^\//, "")}`)}</link>\n` +
      `<description>${escapeXml(description)}</description>\n` +
      `<language>en</language>\n` +
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n` +
      `<ttl>60</ttl>\n` +
      `<docs>http://www.rssboard.org/rss-specification</docs>\n` +
      `<atom:link href="${escapeXml(`${url}${contextPath}${feedPath}`)}" rel="self" type="application/rss+xml" />\n` +
      `<image>\n` +
      `<url>${escapeXml(`${url}${contextPath}img/black-C.png`)}</url>\n` +
      `<title>${escapeXml(title)}</title>\n` +
      `<link>${escapeXml(`${url}${contextPath}${pagePath.replace(/^\//, "")}`)}</link>\n` +
      `</image>\n` +
      sortedNotices.map(generateRssItem).join("") +
      `\n</channel>\n` +
      `</rss>\n`;

    return { feedPath, content: rss, count: sortedNotices.length };
  }

  /**
   * Find the notices page in the build directory
   */
  function findNoticesPage(buildDir) {
    const filePath = join(
      buildDir,
      "docs",
      "reference",
      "notices",
      "index.html"
    );

    if (!existsSync(filePath)) {
      return null;
    }

    return {
      path: "/docs/reference/notices/",
      filePath,
    };
  }

  /**
   * Process the notices page and generate the RSS feed
   */
  function processNoticePage(page, outDir) {
    const htmlContent = readFileSync(page.filePath, "utf8");
    const notices = parseNotices(htmlContent, page.path);

    if (notices.length === 0) {
      console.log(`[notices-feed-plugin] No notices found`);
      return null;
    }

    console.log(
      `[notices-feed-plugin] Found ${notices.length} notices in latest`
    );

    const { feedPath, content, count } = generateRssFeed(notices, page.path);

    const fullPath = resolve(outDir, feedPath);
    mkdirSync(dirname(fullPath), { recursive: true });
    writeFileSync(fullPath, content, "utf8");

    console.log(
      `[notices-feed-plugin] Generated ${feedPath} with ${count} notices`
    );
    return { feedPath, count };
  }

  return {
    name: "notices-feed-plugin",

    async postBuild({ outDir }) {
      const page = findNoticesPage(outDir);

      if (!page) {
        console.log(
          "[notices-feed-plugin] No notices page found in build output"
        );
        return;
      }

      console.log("[notices-feed-plugin] Found 1 notices pages");

      try {
        const result = processNoticePage(page, outDir);
        if (result) {
          console.log(
            "[notices-feed-plugin] Successfully generated 1 RSS feeds"
          );
        }
      } catch (error) {
        console.error(
          "[notices-feed-plugin] Error processing notices:",
          error.message
        );
      }
    },
  };
};
