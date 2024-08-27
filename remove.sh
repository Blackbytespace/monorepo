mv packages/litElement packages/litElement1
git submodule deinit packages/litElement
git rm --cached packages/litElement
mv packages/litElement1 packages/litElement
git add packages/litElement