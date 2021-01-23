
#重新编译 robotjs

npm rebuild --runtime=electron --distrul=https://atom.io/download/atom-shell --target=<electron-version>

--abi=<node对应abi版本>

npm rebuild --runtime=electron --distrul=https://atom.io/download/atom-shell --target=11.2.0 --abi=72

npm install electron-rebuild --save-dev
npx electron-rebuild
