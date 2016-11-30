const {ipcRenderer} = require('electron');

var settingsEl = document.querySelector('#connection');
settingsEl.addEventListener('click', function () {
    ipcRenderer.send('open-history-window');
});

var settingsE2 = document.querySelector('#newConnection');
settingsE2.addEventListener('click', function () {
    ipcRenderer.send('open-connection-window');
});

var settingsE3 = document.querySelector('#bookmark');
settingsE3.addEventListener('click', function () {
   ipcRenderer.send('open-bookmarks-window');
});

ipcRenderer.on('close-history-window', function (event, arg) {
    loginFunction(arg);
});

