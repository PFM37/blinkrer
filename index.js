const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,  // Initial width (this won't be used in fullscreen mode)
    height: 600, // Initial height (this won't be used in fullscreen mode)
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,  // ✅ Required with nodeIntegration
      webviewTag: true          // ✅ Enables <webview>
    }
  });

  // Set the window to fullscreen
  win.maximize();

  win.loadFile(path.join(__dirname, 'src', 'index.html'));

  // Optionally, add a listener to toggle fullscreen on some condition or event
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
