'use strict';

/*
** TODO
** # add icon badge to display unread messages
http://electron.atom.io/docs/v0.30.0/api/app/#app-dock-setbadge-text
** # open new link in default browser
*/

const electron = require('electron');
const logger = require('tracer').colorConsole();

const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const shell = require('electron').shell;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.dock.setBadge('■');

app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1400, height: 1200});

  // and load the index.html of the app.
  mainWindow.loadURL('https://feedly.com');

  // let unread = document.getElementById("latesttab_header")[0];

  // console.log(unread);

  // app.dock.setBadge('42');
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('new-window', function(e, url) {
      if(url.indexOf('feedly.com') > -1) {
           logger.debug(url);
      } else {
          e.preventDefault();
          shell.openExternal(url);
      }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    // remove badge
    app.dock.setBadge('');
    mainWindow = null;
  });
});
