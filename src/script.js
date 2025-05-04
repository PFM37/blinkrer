// Variables
const newTabBtn = document.getElementById('new-tab-btn');
const tabsContainer = document.getElementById('tabs');
const urlBar = document.getElementById('urlBar');
let webview = document.getElementById('webview');
const backButton = document.getElementById('back');
const forwardButton = document.getElementById('forward');
const refreshButton = document.getElementById('refresh');
// const moreButton = document.getElementById('more');
let more = document.getElementById('more-menu');
let tabCount = 1;
let activeTab = null;

// End Variables

// Functions
function showMoreMenu() {
    more.addEventListener('mouseover', (e) => {
        
    });
    more.style.display = 'block';
    if (more.style.display === 'block') {
        more.addEventListener('mouseout', () => {
            more.style.display = 'none';
        });
        more.addEventListener('mouseover', () => {
            more.style.display = 'none';
        });
    }

}

function loadURL(input) {
    let url = input.trim();
    if (!url.startsWith('http')) {
        return `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    }
    return url;
}

function urlUpdate() {
    const webview = getActiveWebview();
    if (webview) {
        webview.src = urlBar.value;
    }
}

function setHoverEffect(button) {
    button.addEventListener('mouseover', () => {
        button.style.background = 'linear-gradient(to right, #7302fe54, #C421EC54)';
    });
    button.addEventListener('mouseout', () => {
        button.style.background = '';
    });
}

function getActiveWebview() {
    return document.getElementById(`webview-${activeTab?.replace('tab-', '')}`);
}

function createNewTab(url = 'https://www.google.com') {
    const tabId = `tab-${tabCount}`;
    const webviewId = `webview-${tabCount}`;
    const newTab = document.createElement('div');
    newTab.classList.add('tab');
    newTab.id = tabId;
    newTab.textContent = `Tab ${tabCount}`;
    const closeButton = document.createElement('span');
    closeButton.textContent = '×';
    closeButton.classList.add('close-btn');
    closeButton.onclick = (e) => {
        e.stopPropagation();
        closeTab(tabId, webviewId);
    };
    newTab.appendChild(closeButton);
    newTab.onclick = () => switchTab(tabId, webviewId);
    const newWebview = document.createElement('webview');
    newWebview.id = webviewId;
    newWebview.src = url;
    newWebview.classList.add('webview');
    newWebview.setAttribute('allowpopups', 'true');
    newWebview.style.display = 'none';
    newWebview.addEventListener('did-navigate', (event) => {
        if (tabId === activeTab) urlBar.value = event.url;
    });
    newWebview.addEventListener('did-navigate-in-page', (event) => {
        if (tabId === activeTab) urlBar.value = event.url;
    });
    tabsContainer.appendChild(newTab);
    document.getElementById('webview-container').appendChild(newWebview);
    switchTab(tabId, webviewId);
    tabCount++;
}

function switchTab(tabId, webviewId) {
    if (activeTab) {
        const prevTab = document.getElementById(activeTab);
        const prevWebview = document.getElementById(`webview-${activeTab.replace('tab-', '')}`);
        if (prevTab) prevTab.classList.remove('active');
        if (prevWebview) prevWebview.style.display = 'none';
    }

    const tab = document.getElementById(tabId);
    const webview = document.getElementById(webviewId);
    if (tab) tab.classList.add('active');
    if (webview) {
        webview.style.display = 'block';
        urlBar.value = webview.src;
    }

    activeTab = tabId;
}

function closeTab(tabId, webviewId) {
    const tab = document.getElementById(tabId);
    const webview = document.getElementById(webviewId);
    if (tab) tab.remove();
    if (webview) webview.remove();

    if (activeTab === tabId) {
        const remainingTabs = document.querySelectorAll('.tab');
        if (remainingTabs.length > 0) {
            const nextTabId = remainingTabs[0].id;
            const nextWebviewId = `webview-${nextTabId.replace('tab-', '')}`;
            switchTab(nextTabId, nextWebviewId);
        } else {
            urlBar.value = '';
            activeTab = null;
        }
    }
}
// End Functions

// Event Listeners
urlBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && activeTab) {
        const webview = getActiveWebview();
        webview.src = urlBar.value;
        urlUpdate();
    }
});

backButton.addEventListener('click', () => {
    const webview = getActiveWebview();
    webview.goBack();
});

forwardButton.addEventListener('click', () => {
    const webview = getActiveWebview();
    webview.goForward();
});

refreshButton.addEventListener('click', () => {
    const webview = getActiveWebview();
    webview.reload();
});

moreButton.addEventListener('click', () => {
    showMoreMenu();
});

moreButton.addEventListener('mouseover', () => {
    more.style.display = 'block';
})

moreButton.addEventListener('mouseout', () => {
    more.style.display = 'none';
})

newTabBtn.addEventListener('click', () => {
    createNewTab();
});

window.addEventListener('resize', () => {
    const container = document.getElementById('webview-container');
    const height = window.innerHeight - toolbar.offsetHeight - tabsContainer.offsetHeight;
    container.style.height = `${height}px`;
});
// End Event Listeners

// Function Calls
setHoverEffect(backButton);
setHoverEffect(forwardButton);
setHoverEffect(refreshButton);
setHoverEffect(moreButton);
createNewTab();
// End Function Calls