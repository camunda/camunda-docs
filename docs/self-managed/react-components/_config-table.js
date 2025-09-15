import "./_config-table.css";
import React, { useState } from "react";
import { configs } from "./_config-table-data.js";

const TYPE_OPTIONS = ["1-to-1", "Breaking change (double configuration)"];

const SearchableTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const chooseType = (type) => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  const clearType = () => setSelectedType(null);

  const handleSort = (columnKey) => {
    setSortConfig((prev) => ({
      key: columnKey,
      direction:
        prev.key === columnKey && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortableValue = (config, columnKey) => {
    switch (columnKey) {
      case "area":
        const areaArray = Array.isArray(config.area)
          ? config.area
          : config.area
            ? [config.area]
            : [];
        return areaArray.join(", ").toLowerCase();
      case "name":
        return config.name.toLowerCase();
      case "legacy":
        const legacyArray = Array.isArray(config.legacy)
          ? config.legacy
          : [config.legacy].filter(Boolean);
        return legacyArray.join(", ").toLowerCase();
      case "type":
        const typeArray = Array.isArray(config.types)
          ? config.types
          : config.type
            ? [config.type]
            : [];
        return typeArray.join(", ").toLowerCase();
      default:
        return "";
    }
  };

  const filteredConnectors = configs.filter((config) => {
    const search = searchTerm.toLowerCase();
    const legacyArray = Array.isArray(config.legacy)
      ? config.legacy
      : [config.legacy].filter(Boolean);
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

  const sortedConnectors = [...filteredConnectors].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = getSortableValue(a, sortConfig.key);
    const bValue = getSortableValue(b, sortConfig.key);

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return " ";
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="config-input">
      <input
        type="text"
        placeholder="Find a configuration property"
        value={searchTerm}
        onChange={handleSearch}
        className="config-input-box"
        aria-label="Search configuration properties"
      />

      <div
        className="filter-badges"
        role="toolbar"
        aria-label="Filter properties by type"
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
              : t === "Breaking change (double configuration)"
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

      {sortedConnectors.length > 0 ? (
        <div className="config-table-wrapper">
          <table className="config-table">
            <thead>
              <tr>
                <th
                  className="sortable-header"
                  onClick={() => handleSort("area")}
                  style={{ cursor: "pointer" }}
                >
                  Area{getSortIcon("area")}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => handleSort("name")}
                  style={{ cursor: "pointer" }}
                >
                  New property (8.8){getSortIcon("name")}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => handleSort("legacy")}
                  style={{ cursor: "pointer" }}
                >
                  Legacy properties (8.7 and earlier){getSortIcon("legacy")}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => handleSort("type")}
                  style={{ cursor: "pointer" }}
                >
                  Type{getSortIcon("type")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedConnectors.map((config, index) => {
                const legacyArray = Array.isArray(config.legacy)
                  ? config.legacy
                  : [config.legacy].filter(Boolean);
                const typeArray = Array.isArray(config.types)
                  ? config.types
                  : config.type
                    ? [config.type]
                    : [];
                const areaArray = Array.isArray(config.area)
                  ? config.area
                  : config.area
                    ? [config.area]
                    : [];
                return (
                  <tr key={index}>
                    <td>{areaArray.length > 0 ? areaArray.join(", ") : "-"}</td>
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
                            <p style={{ marginBottom: "-10px" }}>
                              <span
                                key={t}
                                className={`badge badge--${t
                                  .toLowerCase()
                                  .replace(/[^a-z0-9]+/g, "-")}`}
                              >
                                {t}
                              </span>
                            </p>
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
            Sorry, no configuration properties were found matching those
            filters.
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
