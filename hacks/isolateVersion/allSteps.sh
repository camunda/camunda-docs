#!/bin/bash   
set -e # exit at first error

# Before running this script make sure these versions are correct!
ARCHIVED_VERSION="0.25"
# ARCHIVED_OPTIMIZE_VERSION="3.7.0"

read -p "You're about to delete every version from this branch except ${ARCHIVED_VERSION}. Are you sure you want to do this? Enter Y or y to continue, or anything else to exit." CONTINUE

if [[ ! $CONTINUE =~ ^[Yy]$ ]]
then
  echo "Exiting!"
  exit 0
fi

script_directory=$(cd "$(dirname "$0")" && pwd)

source $script_directory/1-reduceVersionManifest.sh
source $script_directory/2-deleteOtherVersions.sh

echo "Complete!"