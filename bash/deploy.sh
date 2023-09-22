#!/bin/bash

commitlog="add bash"
echo "$commitlog"

script_path=$(dirname $(readlink -f $0))
cd $script_path
# HERE: kiGo/bash

echo "step 1: clone repository"
git clone git@github.com:duganlx/duganlx.github.io.git
cd duganlx.github.io
# HERE: kiGo/bash/duganlx.github.io
git pull

echo "step 2: move .git to /dist"
cd $script_path
cd ..
# HERE: kiGo
yarn build
cp -r bash/duganlx.github.io/.git dist/

cd dist
# HERE: kiGo/dist
echo "step 3: commit and push"
git add .
git commit -m "$commitlog"
git push

cd ..
# HERE: kiGo
echo "step 4: clean env"
rm -rf bash/duganlx.github.io
