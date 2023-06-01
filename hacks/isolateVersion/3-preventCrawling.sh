echo "Preventing unsupported site from being crawled..."

# echo a multi-line string into file.txt


echo -e 'User-agent: *\nDisallow: /' > static/robots.txt

git add static/robots.txt
git commit -m "archiving: prevent unsupported site from being crawled"
