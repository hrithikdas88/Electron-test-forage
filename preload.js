const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }

  // document.getElementById("btn").addEventListener("click", () => {
  //   ipcRenderer.send("screenshot:capture", {});
  // });
  // ipcRenderer.on('screenshot:captured', (e,imageData)=>{
  //   document.getElementById('placeholder').src = imageData
  // })
});
