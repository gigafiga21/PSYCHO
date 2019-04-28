var installer = require('electron-winstaller');
var path      = require('path');
const dialog  = require('electron').dialog;

console.log("packaging into an exe...\n");
resultPromise = installer.createWindowsInstaller({
    appDirectory: './WIN32',
    authors: 'gigafiga21',
});

resultPromise.then(function () {
    console.log("Installer created");
    dialog.showMessageBox({
        type:    'info',
        title:   'electron-winstaller',
        message: "Installer created",
        buttons: ['ok']
    });
    require('electron').app.quit();
});
