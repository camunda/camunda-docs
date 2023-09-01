notify "Updating theme components..."

rm -rf src/theme/AnnouncementBar
mkdir -p src/theme/DocVersionBanner
cp hacks/isolateVersion/assets/theme/DocVersionBanner/index.js src/theme/DocVersionBanner/index.js

git add src/theme
git commit -m "archiving($ARCHIVED_VERSION): update theme components"