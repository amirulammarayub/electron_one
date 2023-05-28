// importing modules 
// two electron modules
// using CommonJS syntax
// 'app' is using camelCase, since it is not instantiable
// 'module' is using PascalCase, since it is instantiable
// currently, using 'import' to load module is not directly supported using electron
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// writing reusable function to instantiate windows
// the createWindow() will load web page into BrowserWindow instance
const createWindow = () => {
    const win = new BrowserWindow ({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    ipcMain.handle('ping', () => 'pong');

    win.loadFile('index.html');
};

// calling the function when the app is ready
// remember that 'app' is one of the event emitter
// in electron, BrowserWindow can only be created after 'app' module's ready event
// is fired.
// we can wait for this event by using the app.whenReady() Api 
// and calling createWindow() once its promise is fulfilled.
app.whenReady().then(()=> {
    createWindow();

    // macOS, app will still run in bg even when no windows are open, 
    // need to tell it to open new window when we run the app

    app.on('activate' ,() => {
        if (BrowserWindow.getAllWindows().length == 0) createWindow();
    });
});
// usually node.js use 'on.('ready', callback()); 
// but electron exposes app.whenReady() as a helper specifically for the 'ready'
// event to avoid subtle pitfalls with directly listening to that event in particular.


// being inclusive to darwin (macOS)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});




