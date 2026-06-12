notify "Updating theme components..."

rm -rf src/theme/AnnouncementBar

git add src/theme
git commit -m "archiving($ARCHIVED_VERSION): update theme components"
