#!/usr/bin/env python3
import json
import sys
import argparse
from pathlib import Path

def create_class_diagram(mappings, class_name):
  properties = mappings.get("mappings", {}).get("properties", {})
  lines = [f"    class {class_name} {{"]

  for field, info in properties.items():
    if info.get("type") != "join":
      lines.append(f"        +{field} : {info.get('type', 'object')}")

  lines.append("    }")
  return "\n".join(lines)

def create_join_diagram(mappings):
  properties = mappings.get("mappings", {}).get("properties", {})
  classes, lines = set(), []

  for field_info in properties.values():
    if field_info.get("type") == "join":
      for parent, children in field_info.get("relations", {}).items():
        classes.add(parent)
        for child in children:
          classes.add(child)
          lines.append(f"    {parent.title()} --|> {child.title()} : Has many")

  if not lines:
    return ""

  lines.append("")
  for cls in sorted(classes):
    lines.extend([f"    class {cls.title()} {{ \n    }}", ""])

  return "\n".join(lines)

def wrap_mermaid(content):
  return ["```mermaid", "classDiagram", content, "```"]

def main():
  parser = argparse.ArgumentParser(description="Generate Mermaid diagrams from JSON schema files")
  parser.add_argument("prefix", help="Prefix for filtering JSON files")
  parser.add_argument("--schema", required=True, help="Directory containing the schema JSON files")
  parser.add_argument("--destination", required=True, help="Output file path")

  args = parser.parse_args()

  files = list(Path(args.schema).rglob(f"{args.prefix}*.json"))

  toc = []
  content = []

  for file in sorted(files):
    class_name = file.stem
    with file.open() as f:
      mappings = json.load(f)

    toc.append(f"- [{class_name}](#{class_name})")
    content.append(f"## {class_name}")
    content.append("")
    content.extend(wrap_mermaid(create_class_diagram(mappings, class_name)))

    join_diagram = create_join_diagram(mappings)
    if join_diagram:
      content.extend(wrap_mermaid(join_diagram))
    content.append("")

  with open(args.destination, "w") as f:
    f.write("\n".join(toc + [""] + content))

  print(f"Generated '{args.destination}'")

if __name__ == "__main__":
  main()