notify "Preventing unsupported site from being crawled..."

echo -e 'User-agent: *\nDisallow: /' > static/robots.txt

git add static/robots.txt
git commit -m "archiving($ARCHIVED_VERSION): prevent unsupported site from being crawled"
