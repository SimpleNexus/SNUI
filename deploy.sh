#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build:lib

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
 git push -f git@github.com:SimpleNexus/SNUI.git master:package

cd -
