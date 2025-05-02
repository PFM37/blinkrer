document.addEventListener("DOMContentLoaded", () => {
    const urlBar = document.getElementById("urlBar");
    const container = document.getElementById("container");
    const backButton = document.getElementById("back");
    const forwardButton = document.getElementById("forward");
    const refreshButton = document.getElementById("refresh");

    let historyStack = [];
    let historyIndex = -1;

    function loadPage(url) {
        if (!url.startsWith("http")) {
            // Treat it as a search query
            let searchUrl = "https://google.com/search?query=" + encodeURIComponent(url);
            loadWebview(searchUrl);
        } else {
            // Treat it as a direct URL and fetch the site content
            fetchWebsite(url);
        }
    }

    function loadWebview(searchUrl) {
        container.innerHTML = `<webview class="webview" src="${searchUrl}" align="center"></webview>`;
        updateHistory(searchUrl);
    }

    function fetchWebsite(url) {
        fetch(`/fetch?url=${encodeURIComponent(url)}`)
            .then((response) => response.text())
            .then((html) => {
                container.innerHTML = html; // Load full page content
                updateHistory(url);
            })
            .catch((error) => {
                console.error("Failed to load page:", error);
            });
    }

    function updateHistory(url) {
        if (historyIndex === -1 || historyStack[historyIndex] !== url) {
            historyStack = historyStack.slice(0, historyIndex + 1);
            historyStack.push(url);
            historyIndex++;
        }
    }

    urlBar.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            let query = urlBar.value.trim();
            if (query) loadPage(query);
        }
    });

    backButton.addEventListener("click", () => {
        if (historyIndex > 0) {
            historyIndex--;
            loadPage(historyStack[historyIndex]);
        }
    });

    forwardButton.addEventListener("click", () => {
        if (historyIndex < historyStack.length - 1) {
            historyIndex++;
            loadPage(historyStack[historyIndex]);
        }
    });

    refreshButton.addEventListener("click", () => {
        if (historyStack[historyIndex]) {
            loadPage(historyStack[historyIndex]);
        }
    });
});