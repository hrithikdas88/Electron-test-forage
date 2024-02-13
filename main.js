const {
  app,
  BrowserWindow,
  Menu,
  shell,
  desktopCapturer,
  ipcMain,
} = require("electron");
const path = require("path");

const menuItems = [
  {
    label: "Menu",
    submenu: [
      {
        label: "About",
      },
      {
        label: "New window",
        click: async () => {
          // await shell.openExternal("https://wac.co");
          const win2 = new BrowserWindow({
            height: 200,
            width: 400,
          });
          win2.loadFile("login.html");
        },
      },
      {
        label: "New URL",
        click: async () => {
          const win3 = new BrowserWindow({
            height: 200,
            width: 400,
          });
          win3.loadURL("https://wac.co");
          win3.once("ready-to-show", () => win3.show());
        },
      },
    ],
  },
  {
    label: "File",
    submenu: [
      {
        label: "Learn more",
        click: async () => {
          await shell.openExternal("https://wac.co");
        },
      },
      {
        type: "separator",
      },
      {
        label: "Exit",
        click: () => app.quit(),
      },
      {
        role: "close",
      },
    ],
  },
  {
    label: "Screenshot",
    submenu: [
      {
        label: "Take screenshot",
        click: async () => {
          const win4 = new BrowserWindow({
            height: 300,
            width: 400,
            movable: false,
          });
          win4.loadFile("screenshot.html");
        },
      },
      {
        type: "separator",
      },
      {
        label: "Exit",
        click: () => app.quit(),
      },
      {
        role: "close",
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  console.log(process.platform, "heyy");
  if (process.platform !== "darwin") app.quit();
});

// ipcMain.on("screenshot:capture", (e, value) => {
//   desktopCapturer
//     .getSources({
//       types: ["window"],
//       thumbnailSize: { width: 1920, height: 1080 },
//     })
//     .then((sources) => {
//       let image = sources[0].thumbnail.toDataURL();
//       win.webContents.send("screenshot:captured", image);
//     });
// });
