# The generator adds a version badge to the Introduction file, but 
#   we already have a version badge from the main docs layout.
sed -i '' '/Version: 0.1/d' docs/apis-tools/zeebe-api-rest/specifications/zeebe-rest-api.info.mdx