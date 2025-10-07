Regarding maintenant of the [by_models.csv](\static\data\by_models.csv) file which feeds into the component from [LiveBenchModelFilter](\components\react-components\livebench-model-filter.js)

# Benchmark Data

This repo contains benchmark CSVs for LLMs.  
They are exported manually (copy-pasted) from:

- [LiveBench](https://livebench.ai/#/)
- [ArtificialAnalysis](https://artificialanalysis.ai/)

You can use the [script](\static\data\script\Clean_and_Extend_getlivebench_data.ipynb) to fetch the artificial analysis data faster.

## How to update

1. Open each site.
2. Copy-paste or download the CSV as provided.
3. Replace the old file in this repo.
4. Commit the change.

## Format

- Keep exactly the same schema as exported.
- Do not rename, reorder, or edit columns.
- Leave missing values blank.
- Commit the **raw CSV only** (no edits, no formatting).
