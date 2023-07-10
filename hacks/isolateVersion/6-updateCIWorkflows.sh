notify "Updating CI workflows..."

# 1. linkcheck: delete the file.
rm .github/workflows/linkcheck.yaml

# 2. build-docs: remove everything after the line `NODE_OPTIONS: --max_old_space_size=4096`.
sed -i '' '/NODE_OPTIONS: --max_old_space_size=4096/q' .github/workflows/build-docs.yaml

# 3. publish-prod: 

#   1. remove every line after `tags:` until the first blank line.
sed -i '' '/tags:/,/^$/ { /tags:/! { /^$/!d; }; }' .github/workflows/publish-prod.yaml

#   2. add a line after `tags:` that says `{ARCHIVED_VERSION}.[0-9]+`, so that only this archived version's tags trigger a production build.
sed -i '' "/tags:/a\\
      - \"$ARCHIVED_VERSION.[0-9]+\"
" .github/workflows/publish-prod.yaml

#   3. replace the main docs remote_path with this isolated version's remote_path.
sed -i '' "s/remote_path: \${{ secrets.AWS_PROD_PUBLISH_PATH }}/remote_path: \${{ secrets.AWS_PROD_PUBLISH_PATH_UNSUPPORTED }}\/$ARCHIVED_VERSION/g" .github/workflows/publish-prod.yaml

# 4. publish-stage:
#   1. replace `branches: - main` with `branches: - unsupported/{version}`
#   2. remove `disable indexing` step
#   3. replace `https://docs.camunda.io` with `https://unsupported.docs.camunda.io`
#   4. replace `https://stage.docs.camunda.io` with `https://stage.unsupported.docs.camunda.io`
#   5. replace `${{ secrets.AWS_STAGE_PUBLISH_PATH }}` with `${{ secrets.AWS_STAGE_PUBLISH_PATH_UNSUPPORTED }}/{version}`


# git add .github/workflows
# git commit -m "archiving: update CI workflows"