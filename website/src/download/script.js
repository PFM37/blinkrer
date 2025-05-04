function checkForDevice() {
    const hash = window.location.hash.toLowerCase();

    if (hash === "#win") {
        console.log("Windows platform detected.");
        window.location.href = "/dist/blinkr.exe";
    } else if (hash === "#linux") {
        console.log("Linux platform detected.");
        window.location.href = "download/blinkr.tar.gz";
    } else if (hash === "#mac") {
        console.log("macOS platform detected.");
        window.location.href = "download/blinkr.dmg";
    }
}
setInterval(checkForDevice, 3000);