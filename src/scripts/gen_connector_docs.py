from jinja2 import Environment, FileSystemLoader, select_autoescape
import json

def get_property_group(properties):
    """Determine if property is part of a group.

    If a property is part of a group, return the group. Otherwise, return "general properties".
    """
    if condition := properties.get("condition"):
        if property_group := condition.get("equals"):
            return property_group
        elif condition.get("allMatch"):
            return " and ".join([match["equals"] for match in condition["allMatch"]])

    return "general properties"

def get_dropdown_options(properties):
    """Parse dropdown options, if available."""

    if properties["type"].lower() == "dropdown":
        return properties["choices"]

def get_hooks(element_template, group_id):
    """Get hooks, if available."""

    before = after = None

    try:
        with open(f"../../docs/components/connectors/out-of-the-box-connectors/reference_partial_hooks/_{element_template}__before_{group_id}.md") as f:
            before = f.read()
    except:
        pass

    after_file = f"out-of-the-box-connectors/reference_partial_hooks/_{element_template}__after_{group_id}.md"
    try:
        with open(f"../../docs/components/connectors/{after_file}") as f:
            after = f.read()
    except:
        after = f"<!-- No hook found. Expected location: {after_file} -->"

    return {"before": before, "after": after}

def parse_element_template_json(filename, element_template):
    """Parse element template file."""

    parsed = {}

    with open(filename, "r") as f:
        raw = json.load(f)

    print(raw.keys())
    print(raw["name"])
    print(raw["description"])
    print(raw["version"])

    parsed["groups"] = {
        group["id"]: {
            "label": group["label"],
            "description": group.get("tooltip", "").replace(r"<br>", r"<br />"),
            "property_groups": {},
            "hooks": get_hooks(element_template, group["id"]),
        }
        for group in raw["groups"]
    }

    for properties in raw["properties"]:
        if properties.get("group"):
            property_group = get_property_group(properties)
            parsed["groups"][properties["group"]]["property_groups"].setdefault(property_group, []).append({
                "id": properties["id"],
                "label": properties["label"],
                "type": properties["type"],
                "required": not properties.get("optional", True),
                "description": properties.get("description"),
                "binding": properties.get("binding"),
                "dropdown_options": get_dropdown_options(properties),
            })

    return parsed

def render_reference_table(template, data, output):
    """Render the reference table using a jinja2 template."""
    content = template.render(data)

    with open(output, "w+") as f:
        f.write(content)

if __name__ == "__main__":
    element_template = "agenticai-aiagent-outbound-connector"

    # Jinja2 environment for loading templates
    env = Environment(
        loader=FileSystemLoader("."),
        autoescape=select_autoescape()
    )
    parsed = parse_element_template_json(f"{element_template}.json", element_template)

    # Load md template
    template = env.get_template("template.md")
    render_reference_table(template, parsed, f"../../docs/components/connectors/out-of-the-box-connectors/generated_reference_partials/{element_template}.md")

