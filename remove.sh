mv packages/factory packages/factory1
git submodule deinit packages/factory
git rm -r --cached packages/factory
mv packages/factory1 packages/factory
git add packages/factory