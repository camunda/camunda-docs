function delete_version() {
  notify "Deleting version $1..."
  folder=versioned_docs/$VERSION
  sidebars=versioned_sidebars/$VERSION-sidebars.json
  rm -rf $folder
  rm $sidebars
  git add versioned_docs versioned_sidebars
  git commit -m "archiving: delete version $VERSION"
}

function delete_next() {
  notify "Deleting next version..."
  folder=docs
  sidebars=sidebars.js
  rm -rf $folder
  rm $sidebars
  git add docs sidebars.js
  git commit -m "archiving: delete version $VERSION"  
}

# list all versions; search for all that don't match the current version; continue even if there are no matches.
OTHER_VERSIONS=$(ls versioned_docs | grep -xv "version-$ARCHIVED_VERSION" || true) 

for VERSION in ${OTHER_VERSIONS[*]}
  do
    delete_version $VERSION
  done

delete_next