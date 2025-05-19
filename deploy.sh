#!/bin/bash

# Create dist directory if it doesn't exist
mkdir -p dist

# Copy HTML file
cp index.html dist/

# Copy and minify CSS
cat styles.css | tr -d '\n' | sed 's/\/\*.*\*\///g' | sed 's/[[:space:]]\+/ /g' > dist/styles.min.css

# Copy JavaScript
cp script.js dist/

# Copy images
mkdir -p dist/images
cp images/* dist/images/ 2>/dev/null || true

# Create a simple .htaccess file for security
echo "Options -Indexes
<FilesMatch \"\.(html|css|js)$\">
    Header set Cache-Control \"max-age=31536000\"
</FilesMatch>" > dist/.htaccess

echo "Deployment files prepared in the 'dist' directory!" 