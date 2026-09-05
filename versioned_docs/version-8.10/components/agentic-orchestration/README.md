Regarding maintenance of the by_models.csv file (in static\data\by_models.csv) that feeds into the component from the LiveBenchModelFilter file (in components\react-components\livebench-model-filter.js).

# Benchmark Data

This repo contains benchmark CSVs for LLMs.  
They are exported manually (copy-pasted) from:

- [LiveBench](https://livebench.ai/#/)

You can use the script file (in static\data\script\Clean_and_Extend_getlivebench_data.ipynb) to fetch the artificial analysis data faster.

## How to update

1. Open livebench site.
2. Copy-paste or download the CSV as provided.
3. fetch the input and output prices from the official source.
4. compute the 3 to 1 blended, 1 being input price and 3 the output.
5. fetch speed numbers from official website or open source and compare it with the number in the csv to place it next to a comparable 0 to 10 (integer)
6. Replace the old file in this repo.
7. Commit the change.

## Format

- Keep exactly the same schema as exported.
- Do not rename, reorder, or edit columns.
- Leave missing values blank.
- Commit the **raw CSV only** (no edits, no formatting).
