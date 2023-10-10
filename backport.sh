SOURCE="docs"
# The folder for the version we want to copy the commits to.
TARGET="versioned_docs/version-8.0"

# The point in `main` at which this branch started. We'll use this to enumerate all the commits in this branch *only*.
BRANCH_POINT=`git merge-base --fork-point origin/main HEAD | git merge-base origin/main HEAD`

# Find all the commits in the source branch, and create a patch file containing all their changes.
git diff -p --relative=$SOURCE $BRANCH_POINT..HEAD $SOURCE > pr-changes.patch

# Apply the patch to the target version. This effectively duplicates all the changes from one version in another.
git apply ./*.patch --directory $TARGET

# Add everything _except_ the patch file.
git add . ':!*.patch'

# Commit with an appropriate message