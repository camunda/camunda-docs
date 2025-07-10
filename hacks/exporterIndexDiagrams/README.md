# What is this used for?

There is a documentation [file](/self-managed/zeebe-deployment/exporters/camunda-exporter-indices.md) for 
Camunda Exporter indices that includes diagrams, currently these are generated manually using the script in this folder.

## Using schema_to_mermaid.py
1. Navigate to the parent directory of the `camunda-docs` repo
   ```shell
   ls -d camunda-docs/ >/dev/null 2>&1 && echo true || echo false 
   # should return true if you are in the right directory
   ```
2. Clone the `camunda/camunda` repo 
   ```shell
   git clone https://github.com/camunda/camunda.git
   ```
3. Install the mermaid cli:
   ```shell
   npm install -g @mermaid-js/mermaid-cli
   ```
4. Install [python3](https://www.python.org/downloads/)
5. Set up directory aliases
   ```shell
   INDEX_DIAGRAM_DIR=./camunda-docs/docs/self-managed/zeebe-deployment/exporters/index-diagrams
   ```
6. Generate the diagram templates which contain the mermaid diagrams as Markdown text.
   ```shell
   python3 camunda-docs/hacks/exporterIndexDiagrams/schema_to_mermaid.py tasklist \
   --schema camunda/webapps-schema/src/main/resources/schema/elasticsearch \
   --destination $INDEX_DIAGRAM_DIR/tasklist-template.md
   ```
   ```shell
   python3 camunda-docs/hacks/exporterIndexDiagrams/schema_to_mermaid.py operate \
   --schema camunda/webapps-schema/src/main/resources/schema/elasticsearch \
   --destination $INDEX_DIAGRAM_DIR/operate-template.md
   ```
   ```shell
   python3 camunda-docs/hacks/exporterIndexDiagrams/schema_to_mermaid.py camunda \
   --schema camunda/webapps-schema/src/main/resources/schema/elasticsearch \
   --destination $INDEX_DIAGRAM_DIR/camunda-template.md
   ```
7. Generate the diagram pages for documentation from the templates
   ```shell
   mmdc -i $INDEX_DIAGRAM_DIR/tasklist-template.md \
   -o $INDEX_DIAGRAM_DIR/tasklist-diagrams.md \
   -e png \
   -c camunda-docs/hacks/exporterIndexDiagrams/styling.json
   ```
   ```shell
   mmdc -i $INDEX_DIAGRAM_DIR/operate-template.md \
   -o $INDEX_DIAGRAM_DIR/operate-diagrams.md \
   -e png \
   -c camunda-docs/hacks/exporterIndexDiagrams/styling.json
   ```
   ```shell
   mmdc -i $INDEX_DIAGRAM_DIR/camunda-template.md \
   -o $INDEX_DIAGRAM_DIR/camunda-diagrams.md \
   -e png \
   -c camunda-docs/hacks/exporterIndexDiagrams/styling.json
   ```
