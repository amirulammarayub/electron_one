// importing modules 
// two electron modules
// using CommonJS syntax
// 'app' is using camelCase, since it is not instantiable
// 'module' is using PascalCase, since it is instantiable
// currently, using 'import' to load module is not directly supported using electron
const { app, BrowserWindow } = require('electron');

// writing reusable function to instantiate windows
// the createWindow() will load web page into BrowserWindow instance
const createWindow = () => {
    const win = new BrowserWindow ({
        width: 800,
        height: 600,
    });

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
})
// usually node.js use 'on.('ready', callback()); 
// but electron exposes app.whenReady() as a helper specifically for the 'ready'
// event to avoid subtle pitfalls with directly listening to that event in particular.



