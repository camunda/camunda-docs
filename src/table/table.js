import React from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import "./style.css";

const DataTable = ({ columns, data }) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Render the UI for your table
  return (
    <table role="table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} role="row">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                role="columnheader"
                className={header.column.columnDef.className}
                style={{ cursor: "pointer" }}
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                <span>
                  {{
                    asc: " ▲",
                    desc: " ▼",
                  }[header.column.getIsSorted()] ?? ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody role="rowgroup">
        {table.getRowModel().rows.map((row, i) => {
          return (
            <tr key={row.id} role="row">
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    role="cell"
                    className={cell.column.columnDef.className}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
