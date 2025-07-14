#!/usr/bin/env python3

def tasklist_header_text():
    return """---
id: camunda-exporter-indices-tasklist
title: "Tasklist index diagrams"
sidebar_label: "Tasklist index diagrams"
description: "The Camunda index diagrams to which the Camunda Exporter will export system state information to."
---

The following index diagrams show Camunda Exporter indices for Tasklist.
"""

def operate_header_text():
    return """---
id: camunda-exporter-indices-operate
title: "Operate index diagrams"
sidebar_label: "Operate index diagrams"
description: "The Operate index diagrams to which the Camunda Exporter will export system state information to."
---

The following index diagrams show Camunda Exporter indices for Operate.
"""

def camunda_header_text():
    return """---
id: camunda-exporter-indices-identity
title: "Camunda identity index diagrams"
sidebar_label: "Camunda index diagrams"
description: "The Camunda identity index diagrams to which the Camunda Exporter will export system state information to."
---

The following index diagrams show Camunda Exporter indices for Camunda identity.
"""


def prepend_to_file(file_path, text_to_prepend):
    try:
        # Read the existing content
        with open(file_path, 'r', encoding='utf-8') as file:
            existing_content = file.read()

        # Write the new content (prepended text + existing content)
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(text_to_prepend + '\n' + existing_content)

        print(f"Successfully prepended text to {file_path}")

    except FileNotFoundError:
        print(f"Error: File {file_path} not found")
    except Exception as e:
        print(f"Error: {e}")

# Main execution
if __name__ == "__main__":
    diagram_directory = "camunda-docs/docs/self-managed/zeebe-deployment/exporters/index-diagrams/"

    prepend_to_file(diagram_directory + "tasklist-diagrams.md",tasklist_header_text())
    prepend_to_file(diagram_directory + "operate-diagrams.md",operate_header_text())
    prepend_to_file(diagram_directory + "camunda-diagrams.md",camunda_header_text())
