#!/bin/bash   
set -e # exit at first error

# Before running this script make sure these versions are correct!
ARCHIVED_VERSION="0.25"
# ARCHIVED_OPTIMIZE_VERSION="3.7.0"

GREEN='\033[0;32m'
YELLOW='\033[0;33m'

function warn() {
  echo -e "${YELLOW}$1${NC}"
}

function notify() {
  echo -e "${GREEN}$1${NC}"
}

read -p "You're about to delete every version from this branch except ${ARCHIVED_VERSION}. Are you sure you want to do this? Enter Y or y to continue, or anything else to exit." CONTINUE

if [[ ! $CONTINUE =~ ^[Yy]$ ]]
then
  warn "Exiting!"
  exit 0
fi

# Used for debugging purposes. If you only want to test one step, Pass the step number in as an argument.
#  example: `./allSteps.sh 1` will only run the first step.
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

if [[ "$script_index" == 5 || -z "$script_index" ]]; then
  source $script_directory/5-updateThemeComponents.sh
fi

notify "Automated steps are complete!"
notify "Manual steps that remain: 
5. Update the docusaurus.config.js
6. Update CI workflows
7. Fix htaccess rules (this might always be manual)
8. Fix links (this will always be manual)
"