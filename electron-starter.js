const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu, Tray } = electron;

const ipc = electron.ipcMain;


let mainWindow;
let tray;
// Listen  for the app to be ready
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

function createWindow() {
    // create new window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: "ReD",
        icon: "./public/favicon.ico"
    });
    
    tray = new Tray('./public/favicon.ico');
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, './build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    // minimize event
    mainWindow.on('minimize', function (event) {
        event.preventDefault();
        mainWindow.hide();
    });


    // load the html file
    /*mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "electron.html"),
        protocol: 'file',
        slashes: true
    })); */

    const menu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(menu);
    const contextMenu  = Menu.buildFromTemplate(contextMenuTemplate);
    tray.setContextMenu(contextMenu);
}



function smDownloads() {
    console.log('Downloads clicked');
}

function smSettings() {
    console.log('Setting clicked');
}

const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Downloads', click() { smDownloads() }
            },
            {
                label: 'Settings', click() { smSettings() }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' }
        ]
    }
];

const contextMenuTemplate = [
    { label: 'Restore', click:  function(){
        mainWindow.show();
    } },
    {
        label: 'Auto Download',
        type:'checkbox',
        click: function(){
            console.log('Auto Download clicked');
        }
    },
    {
        label: 'Settings',
        click: function(){
            console.log('Settings clicked');
        }

    },
    { label: 'Quit', click:  function(){
        app.isQuiting = true;
        app.quit();
    } }
]; 