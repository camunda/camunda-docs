notify "Updating CI workflows..."

# 1. build-docs: remove everything after the line containing `NODE_OPTIONS: --max_old_space_size=`.
sed -i '' '/NODE_OPTIONS: --max_old_space_size=/q' .github/workflows/build-docs.yaml

# 2. publish-prod: 

#   a. remove every line after `tags:` until the first blank line.
sed -i '' '/tags:/,/^$/ { /tags:/! { /^$/!d; }; }' .github/workflows/publish-prod.yaml

#   b. add a line after `tags:` that says `{ARCHIVED_VERSION}.[0-9]+`, so that only this archived version's tags trigger a production build.
sed -i '' "/tags:/a\\
      - \"$ARCHIVED_VERSION.[0-9]+\"
" .github/workflows/publish-prod.yaml

#   c. build-docs: remove the trigger-crawl job.
sed -i '' '/trigger-crawl:/,$d' .github/workflows/publish-prod.yaml

#   d. add `unsupported.` to docs URLs
sed -i '' 's/https:\/\/docs.camunda.io/https:\/\/unsupported.docs.camunda.io/' .github/workflows/publish-prod.yaml

#   e. replace the main docs remote_path with this isolated version's remote_path.
sed -i '' "s/remote_path: \${{ secrets.AWS_PROD_PUBLISH_PATH }}/remote_path: \${{ secrets.AWS_PROD_PUBLISH_PATH_UNSUPPORTED }}\/$ARCHIVED_VERSION/g" .github/workflows/publish-prod.yaml

#   f. update `DOCS_SITE_BASE_URL` to specify isolated version
sed -i '' "s/DOCS_SITE_BASE_URL: \//DOCS_SITE_BASE_URL: \/$ARCHIVED_VERSION\//" .github/workflows/publish-prod.yaml

# 3. publish-stage:

#   a. replace `branches: - main` with `branches: - unsupported/{version}`
sed -i '' "s/- \"main\"/- \"unsupported\/$ARCHIVED_VERSION\"/" .github/workflows/publish-stage.yaml

#   b. add `unsupported.` to docs URLs
sed -i '' 's/https:\/\/stage.docs.camunda.io/https:\/\/stage.unsupported.docs.camunda.io/' .github/workflows/publish-stage.yaml

#   c. replace `${{ secrets.AWS_STAGE_PUBLISH_PATH }}` with `${{ secrets.AWS_STAGE_PUBLISH_PATH_UNSUPPORTED }}/{version}`
sed -i '' "s/remote_path: \${{ secrets.AWS_STAGE_PUBLISH_PATH }}/remote_path: \${{ secrets.AWS_STAGE_PUBLISH_PATH_UNSUPPORTED }}\/$ARCHIVED_VERSION/g" .github/workflows/publish-stage.yaml

#   d. update `DOCS_SITE_BASE_URL` to specify isolated version
sed -i '' "s/DOCS_SITE_BASE_URL: \//DOCS_SITE_BASE_URL: \/$ARCHIVED_VERSION\//" .github/workflows/publish-stage.yaml

git add .github/workflows
git commit -m "archiving($ARCHIVED_VERSION): update CI workflows"