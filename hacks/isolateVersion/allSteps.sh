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

# Used for debugging purposes. If I only want to test one step, I'm passing the step number in as an argument.
script_index=$1

script_directory=$(cd "$(dirname "$0")" && pwd)

if [[ "$script_index" == 1 || -z "$script_index" ]]; then
  source $script_directory/1-reduceVersionManifest.sh
fi

if [[ "$script_index" == 2 || -z "$script_index" ]]; then
  source $script_directory/2-deleteOtherVersions.sh
fi

if [[ "$script_index" == 3 || -z "$script_index" ]]; then
  source $script_directory/3-preventCrawling.sh
fi

if [[ "$script_index" == 4 || -z "$script_index" ]]; then
  source $script_directory/4-fixDockerfile.sh
fi

echo "Complete!"