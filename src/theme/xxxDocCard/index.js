// Why is this swizzled?
//   1. To eliminate unnecessary text truncation on card descriptions
//   2. To allow for highlighting specific cards with a different color border
//   3. To allow for a custom description on a card
// Swizzled from version 2.3.1.

import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
  findFirstCategoryLink,
  useDocById,
} from "@docusaurus/theme-common/internal";
import isInternalUrl from "@docusaurus/isInternalUrl";
import { translate } from "@docusaurus/Translate";
import styles from "./styles.module.css";
function CardContainer({ href, children, border }) {
  var className = clsx("card padding--lg", styles.cardContainer);
  if (border == "highlight") {
    className = clsx(className, styles.cardContainerBetaBorder);
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
function CardLayout({ href, icon, title, description, border }) {
  return (
    <CardContainer href={href} border={border}>
      <h2 className={clsx("text--truncate", styles.cardTitle)} title={title}>
        {icon} {title}
      </h2>
      {description && (
        <p className={clsx(styles.cardDescription)} title={description}>
          {description}
        </p>
      )}
    </CardContainer>
  );
}
function CardCategory({ item }) {
  const href = findFirstCategoryLink(item);
  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }
  return (
    <CardLayout
      href={href}
      icon="🗃️"
      title={item.label}
      description={translate(
        {
          message: "{count} items",
          id: "theme.docs.DocCard.categoryDescription",
          description:
            "The default description for a category card in the generated index about how many items this category includes",
        },
        { count: item.items.length }
      )}
    />
  );
}
function CardLink({ item }) {
  const icon = isInternalUrl(item.href) ? "📄️" : "🔗";
  const doc = useDocById(item.docId ?? undefined);
  const description = doc ? doc.description : item.description;
  return (
    <CardLayout
      href={item.href}
      icon={icon}
      title={item.label}
      description={description}
      border={item.border}
    />
  );
}
export default function DocCard({ item }) {
  switch (item.type) {
    case "link":
      return <CardLink item={item} />;
    case "category":
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
