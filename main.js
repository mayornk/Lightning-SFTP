'use strict';

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow = null;
var {Menu} = require('electron');

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 900,
        width: 1500,
        fullscreenable: false,
        title: "Lightning SFTP"
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Connection',
                accelerator: 'CmdOrCtrl+N',
                click() {
                    var connectionWindow = new BrowserWindow({
                        height: 350,
                        width: 350,
                        alwaysOnTop: true,
                        resizable: false,
                        autoHideMenuBar: true
                    });

                    connectionWindow.loadURL('file://' + __dirname + '/app/connectionWindow.html');

                    connectionWindow.on('closed', function () {
                        connectionWindow = null;
                    });
                }
            },
            {
                label: 'Bookmarks',
                accelerator: 'CmdOrCtrl+B',
                click() {
                    var bookmarksWindow = new BrowserWindow({

                    });
                }
            },
            {
                label: 'Exit',
                role: 'close'
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click (item, focusedWindow) {
                    if (focusedWindow) focusedWindow.reload()
                }
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click (item, focusedWindow) {
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools()
                }
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

const {ipcMain} = require('electron');
ipcMain.on('close-main-window', function () {
   app.quit();
});


var historyWindow = null;
ipcMain.on('open-history-window', function () {

    if(historyWindow){
        return;
    }

    historyWindow = new BrowserWindow({
        height: 500,
        width: 1024,
        alwaysOnTop: true
    });

    historyWindow.loadURL('file://' + __dirname + '/app/historyWindow.html');

    historyWindow.on('closed', function () {
        historyWindow = null;
    });

});

var connectionWindow = null;
ipcMain.on('open-connection-window', function () {

    if(connectionWindow){
        return;
    }

    connectionWindow = new BrowserWindow({
        height: 350,
        width: 350,
        alwaysOnTop: true,
        resizable: false,
        autoHideMenuBar: true
    });

    connectionWindow.loadURL('file://' + __dirname + '/app/connectionWindow.html');

    connectionWindow.on('closed', function () {
        connectionWindow = null;
    });
});

var passwordWindow = null;
ipcMain.on('open-enter-password-window', function () {

    if(passwordWindow){
        return;
    }

    passwordWindow = new BrowserWindow({
        height: 100,
        width: 275,
        alwaysOnTop: true,
        resizable: false,
        autoHideMenuBar: true
    });

    passwordWindow.loadURL('file://' + __dirname + '/app/passwordWindow.html');

    passwordWindow.on('closed', function () {
        passwordWindow = null;
    });
});

ipcMain.on('receive-info', function () {
    console.log("Received Info");
});