notify "Fixing Dockerfile for local debugging..."

sed -i '' -e "s/\(COPY \/build \/usr\/local\/apache2\/htdocs\/\)/\1$ARCHIVED_VERSION\//" Dockerfile
sed -i '' -e "s/\(\/usr\/local\/apache2\/htdocs\/\)\(.htaccess\)/\1$ARCHIVED_VERSION\/\2/" Dockerfile

git add Dockerfile
git commit -m "archiving: fix Dockerfile for local debugging"
