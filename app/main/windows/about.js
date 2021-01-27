const openAboutWindow = require('about-window').default;

const path = require('path')

/*没啥用，等待修改*/
const create = () => openAboutWindow({
    icon_path: path.join(__dirname, 'icon.png'),
    package_json_dir: path.resolve(__dirname  + '/../../../'),
    copyright: 'Copyright (c) 2020 dragon',
    homepage: '',
    bug_report_url: '',
})

module.exports = {create}
