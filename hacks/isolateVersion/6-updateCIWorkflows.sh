notify "Updating CI workflows..."

# 1. build-docs: remove everything after the line containing `NODE_OPTIONS: --max_old_space_size=`.
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' '/NODE_OPTIONS: --max_old_space_size=/q' .github/workflows/build-docs.yaml
else
  sed -i '/NODE_OPTIONS: --max_old_space_size=/q' .github/workflows/build-docs.yaml
fi

# 2. publish-prod: 

#   a. remove every line after `tags:` until the first blank line.
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' '/tags:/,/^$/ { /tags:/! { /^$/!d; }; }' .github/workflows/publish-prod.yaml
else
  sed -i '/tags:/,/^$/ { /tags:/! { /^$/!d; }; }' .github/workflows/publish-prod.yaml
fi

#   b. add a line after `tags:` that says `{ARCHIVED_VERSION}.[0-9]+`, so that only this archived version's tags trigger a production build.
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "/tags:/a\\
      - \"$ARCHIVED_VERSION.[0-9]+\"
" .github/workflows/publish-prod.yaml
else
  sed -i "/tags:/a\\
      - \"$ARCHIVED_VERSION.[0-9]+\"
" .github/workflows/publish-prod.yaml
fi

#   c. build-docs: remove the trigger-crawl job.
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' '/trigger-crawl:/,$d' .github/workflows/publish-prod.yaml
else
  sed -i '/trigger-crawl:/,$d' .github/workflows/publish-prod.yaml
fi

#   d. add `unsupported.` to docs URLs
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' 's/https:\/\/docs.camunda.io/https:\/\/unsupported.docs.camunda.io/' .github/workflows/publish-prod.yaml
else
  sed -i 's/https:\/\/docs.camunda.io/https:\/\/unsupported.docs.camunda.io/' .github/workflows/publish-prod.yaml
fi

#   e. replace the main docs remote_path with this isolated version's remote_path.
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/remote_path: \${{ secrets.AWS_PROD_PUBLISH_PATH }}/remote_path: \${{ secrets.AWS_PROD_PUBLISH_PATH_UNSUPPORTED }}\/$ARCHIVED_VERSION/g" .github/workflows/publish-prod.yaml
else
  sed -i "s/remote_path: \${{ secrets.AWS_PROD_PUBLISH_PATH }}/remote_path: \${{ secrets.AWS_PROD_PUBLISH_PATH_UNSUPPORTED }}\/$ARCHIVED_VERSION/g" .github/workflows/publish-prod.yaml
fi

#   f. update `DOCS_SITE_BASE_URL` to specify isolated version
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/DOCS_SITE_BASE_URL: \//DOCS_SITE_BASE_URL: \/$ARCHIVED_VERSION\//" .github/workflows/publish-prod.yaml
else
  sed -i "s/DOCS_SITE_BASE_URL: \//DOCS_SITE_BASE_URL: \/$ARCHIVED_VERSION\//" .github/workflows/publish-prod.yaml
fi

# 3. publish-stage:

#   a. replace `branches: - main` with `branches: - unsupported/{version}`
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/- \"main\"/- \"unsupported\/$ARCHIVED_VERSION\"/" .github/workflows/publish-stage.yaml
else
  sed -i "s/- \"main\"/- \"unsupported\/$ARCHIVED_VERSION\"/" .github/workflows/publish-stage.yaml
fi

#   b. add `unsupported.` to docs URLs
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' 's/https:\/\/stage.docs.camunda.io/https:\/\/stage.unsupported.docs.camunda.io/' .github/workflows/publish-stage.yaml
else
  sed -i 's/https:\/\/stage.docs.camunda.io/https:\/\/stage.unsupported.docs.camunda.io/' .github/workflows/publish-stage.yaml
fi

#   c. replace `${{ secrets.AWS_STAGE_PUBLISH_PATH }}` with `${{ secrets.AWS_STAGE_PUBLISH_PATH_UNSUPPORTED }}/{version}`
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/remote_path: \${{ secrets.AWS_STAGE_PUBLISH_PATH }}/remote_path: \${{ secrets.AWS_STAGE_PUBLISH_PATH_UNSUPPORTED }}\/$ARCHIVED_VERSION/g" .github/workflows/publish-stage.yaml
else
  sed -i "s/remote_path: \${{ secrets.AWS_STAGE_PUBLISH_PATH }}/remote_path: \${{ secrets.AWS_STAGE_PUBLISH_PATH_UNSUPPORTED }}\/$ARCHIVED_VERSION/g" .github/workflows/publish-stage.yaml
fi

#   d. update `DOCS_SITE_BASE_URL` to specify isolated version
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/DOCS_SITE_BASE_URL: \//DOCS_SITE_BASE_URL: \/$ARCHIVED_VERSION\//" .github/workflows/publish-stage.yaml
else
  sed -i "s/DOCS_SITE_BASE_URL: \//DOCS_SITE_BASE_URL: \/$ARCHIVED_VERSION\//" .github/workflows/publish-stage.yaml
fi

git add .github/workflows
git commit -m "archiving($ARCHIVED_VERSION): update CI workflows"