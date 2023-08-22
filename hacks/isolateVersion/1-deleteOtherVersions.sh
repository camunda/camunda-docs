function delete_version() {
  local version_name=${1}
  local folder=${2}
  local sidebars=${3}

  rm -rf $folder
  rm $sidebars
  # This is all of the possible things that could have been deleted.
  git add $folder $sidebars
  git commit -m "archiving($ARCHIVED_VERSION): delete version $version_name"  
}

# list all versions; search for all that don't match the current version; continue even if there are no matches.
OTHER_VERSIONS=$(ls versioned_docs | grep -xv "version-$ARCHIVED_VERSION" || true) 

for VERSION in ${OTHER_VERSIONS[*]}
  do
    delete_version "docs/$VERSION" "versioned_docs/$VERSION" "versioned_sidebars/$VERSION-sidebars.json"
  done

# delete docs/next version
delete_version "docs/next" "docs" "sidebars.js"

# list all *optimize* versions; search for all that don't match the current version; continue even if there are no matches.
OTHER_OPTIMIZE_VERSIONS=$(ls optimize_versioned_docs | grep -xv "version-$ARCHIVED_OPTIMIZE_VERSION" || true) 

for VERSION in ${OTHER_OPTIMIZE_VERSIONS[*]}
  do
    delete_version "optimize/$VERSION" "optimize_versioned_docs/$VERSION" "optimize_versioned_sidebars/$VERSION-sidebars.json"
  done

# delete optimize/next version
delete_version "optimize/next" "optimize" "optimize_sidebars.js"

