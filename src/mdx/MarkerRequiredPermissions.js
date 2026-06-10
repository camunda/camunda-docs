import React from "react";
import Heading from "@theme/Heading";

// Link to the concept page that explains resources and permissions.
// Relative (not site-absolute) so it resolves within the current docs version,
// the same way the consistency marker links work. Every generated endpoint page
// lives at .../apis-tools/orchestration-cluster-api-rest/specifications/<id>/,
// so the concept page is four directories up.
const AUTHORIZATIONS_DOCS_URL =
  "../../../../components/concepts/access-control/authorizations/#owners-resources-and-permissions";

// Renders one entry of the x-required-permissions array as a table row.
// Top-level entries are ANDed together; each entry is one of:
//  - a static { resourceType, permissionType } pair
//  - an { anyOf: [...] } group whose pairs are ORed
//  - a { dynamic: true, note } marker resolved at runtime
const PermissionRow = ({ entry }) => {
  if (entry.dynamic) {
    return (
      <tr>
        <td>
          <em>Determined at runtime</em>
        </td>
        <td>{entry.note || "Resolved from the request."}</td>
      </tr>
    );
  }

  if (Array.isArray(entry.anyOf)) {
    const options = entry.anyOf;
    if (options.length === 0) return null;
    const sameResource = options.every(
      (o) => o.resourceType === options[0].resourceType
    );

    if (sameResource) {
      return (
        <tr>
          <td>
            <code>{options[0].resourceType}</code>
          </td>
          <td>
            {options.map((o, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <span className={"required-permissions__or"}> or </span>
                )}
                <code>{o.permissionType}</code>
              </React.Fragment>
            ))}
          </td>
        </tr>
      );
    }

    return (
      <tr>
        <td colSpan={2}>
          {options.map((o, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <span className={"required-permissions__or"}> or </span>
              )}
              <code>{o.resourceType}</code> &middot;{" "}
              <code>{o.permissionType}</code>
            </React.Fragment>
          ))}
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>
        <code>{entry.resourceType}</code>
      </td>
      <td>
        <code>{entry.permissionType}</code>
      </td>
    </tr>
  );
};

export const MarkerRequiredPermissions = ({
  permissions = [],
  enforcement,
}) => {
  const hasPermissions = Array.isArray(permissions) && permissions.length > 0;

  return (
    <div className={"required-permissions"}>
      <Heading
        as={"h2"}
        id={"required-permissions"}
        className={"openapi-tabs__heading"}
      >
        Required permissions
      </Heading>

      {!hasPermissions ? (
        <p>
          This endpoint does not require any specific permission. See{" "}
          <a href={AUTHORIZATIONS_DOCS_URL}>resources and permissions</a> to
          learn more.
        </p>
      ) : (
        <>
          <p>
            Calling this endpoint requires the following authorization
            {permissions.length > 1 ? "s (all are required)" : ""}. See{" "}
            <a href={AUTHORIZATIONS_DOCS_URL}>resources and permissions</a> to
            learn more.
          </p>
          <table className={"required-permissions__table"}>
            <thead>
              <tr>
                <th>Resource type</th>
                <th>Permission</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((entry, i) => (
                <PermissionRow key={i} entry={entry} />
              ))}
            </tbody>
          </table>
          {enforcement === "filter" && (
            <p>
              <em>
                Results you are not authorized to access are filtered from the
                response rather than rejected.
              </em>
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default MarkerRequiredPermissions;
