import "./_config-table.css";
import React, { useState } from "react";
import { configs } from "./_config-table-data.js"; // assume each item may now have 'types' array

const TYPE_OPTIONS = ["1-to-1", "Double-configuration"]; // extend if needed

const SearchableTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // SINGLE selection (null = All)
  const [selectedType, setSelectedType] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Select (or deselect if clicking the same)
  const chooseType = (type) => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  const clearType = () => setSelectedType(null);

  const filteredConnectors = configs.filter((config) => {
    const search = searchTerm.toLowerCase();

    // Normalize legacy -> always an array
    const legacyArray = Array.isArray(config.legacy)
      ? config.legacy
      : [config.legacy].filter(Boolean);

    // Normalize types: support old 'type' string or new 'types' array
    const typeArray = Array.isArray(config.types)
      ? config.types
      : config.type
        ? [config.type]
        : [];

    const matchesSearchTerm =
      config.name.toLowerCase().includes(search) ||
      legacyArray.some((l) => l.toLowerCase().includes(search));

    const matchesTypeFilter = !selectedType || typeArray.includes(selectedType);

    return matchesSearchTerm && matchesTypeFilter;
  });

  return (
    <div className="config-input">
      <input
        type="text"
        placeholder="Find a configuration key"
        value={searchTerm}
        onChange={handleSearch}
        className="config-input-box"
        aria-label="Search configuration keys"
      />

      <div
        className="filter-badges"
        role="toolbar"
        aria-label="Filter configuration keys by type"
      >
        <span
          role="button"
          tabIndex={0}
          className={`badge--default ${!selectedType ? "badge--active" : ""}`}
          onClick={clearType}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && clearType()}
          title="Show all types"
          aria-pressed={!selectedType}
        >
          All
        </span>
        {TYPE_OPTIONS.map((t) => {
          const active = selectedType === t;
          const classSuffix =
            t === "1-to-1"
              ? "1-to-1"
              : t === "Double-configuration"
                ? "double-configuration"
                : "default";
          return (
            <span
              key={t}
              role="button"
              tabIndex={0}
              className={`badge--default ${
                active ? `badge--active--${classSuffix}` : ""
              }`}
              onClick={() => chooseType(t)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && chooseType(t)
              }
              aria-pressed={active}
            >
              {t}
            </span>
          );
        })}
      </div>

      {filteredConnectors.length > 0 ? (
        <div className="config-table-wrapper">
          <table className="config-table">
            <thead>
              <tr>
                <th>New key (8.8)</th>
                <th>Legacy key(s) (8.7 and earlier)</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredConnectors.map((config, index) => {
                const legacyArray = Array.isArray(config.legacy)
                  ? config.legacy
                  : [config.legacy].filter(Boolean);
                const typeArray = Array.isArray(config.types)
                  ? config.types
                  : config.type
                    ? [config.type]
                    : [];
                return (
                  <tr key={index}>
                    <td className="config-table-name">
                      <code>{config.name}</code>
                    </td>
                    <td>
                      {legacyArray.length > 1 ? (
                        <ul className="config-legacy-list">
                          {legacyArray.map((l) => (
                            <li key={l}>
                              <code>{l}</code>
                            </li>
                          ))}
                        </ul>
                      ) : legacyArray.length === 1 ? (
                        <code>{legacyArray[0]}</code>
                      ) : (
                        <em>-</em>
                      )}
                    </td>
                    <td>
                      {typeArray.length > 0 ? (
                        <div className="config-type-badges">
                          {typeArray.map((t) => (
                            <span
                              key={t}
                              className={`badge badge--${t
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")}`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <em>-</em>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p className="config-no-results">
            Sorry, no configuration keys were found matching those filters.
          </p>
          <ul className="config-no-results-list">
            <li>Check your spelling.</li>
            <li>Try a different search term.</li>
            <li>Clear or change the type filter.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableTable;
