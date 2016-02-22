'use strict';

const electron = require('electron');
const logger = require('tracer').colorConsole();

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell = require('electron').shell;

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.dock.setBadge('■');

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1400, height: 1200});
  mainWindow.loadURL('https://feedly.com');
  mainWindow.webContents.openDevTools();


  mainWindow.webContents.on('new-window', function(e, url) {
      if(url.indexOf('feedly.com') > -1) {
           logger.debug(url);
      } else {
          e.preventDefault();
          shell.openExternal(url);
      }
  });

  mainWindow.on('closed', function() {
    app.dock.setBadge('');
    mainWindow = null;
  });
});
