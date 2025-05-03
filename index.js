const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,  // Initial width (won't matter in fullscreen)
    height: 600, // Initial height (won't matter in fullscreen)
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,  // Required when nodeIntegration is true
      webviewTag: true          // Enables <webview> tag
    }
  });

  // Set the window to fullscreen
  win.maximize();

  // Load the index.html (renderer process)
  win.loadFile(path.join(__dirname, 'test', 'index.html'));

  // You could optionally add a listener here for other events, like resize.
  win.on('resize', () => {
    // Handle window resizing if needed
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
