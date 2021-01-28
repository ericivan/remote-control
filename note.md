
#重新编译 robotjs

npm rebuild --runtime=electron --distrul=https://atom.io/download/atom-shell --target=<electron-version>

--abi=<node对应abi版本>

npm rebuild --runtime=electron --distrul=https://atom.io/download/atom-shell --target=11.2.0 --abi=72

npm install electron-rebuild --save-dev
npx electron-rebuild


icns

sips 生成对应尺寸图

icountil -c icns icons.iconset -o icon.icns


# 打包库

npm i electron-builder electron-builder-squirrel-windows cross-env --save-dev

npm install --global --production windows-build-tools (window 下必备)

npm i electron-builder --save-dev

npm i cross-env --save
    cross-env npm_config_electron_mirror="https://npm.taobao.org/mirrors/electron/" electron-builder build --mac
    cross-env npm_config_electron_mirror="https://npm.taobao.org/mirrors/electron" electron-builder build --win --ia32

   
npm remove electron-rebuild

package.json 中加入 "postinstall":"electron-builder install-app-deps"

npm install electron-builder-squirrel-windows(windows下)

