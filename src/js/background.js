// background.js

// set tabs in localStorage
function setAllTabs(tabs) {
    localStorage.setItem("tabsInfo", JSON.stringify(tabs));
    console.log(tabs);
}
// get tabs in localStorage
function getAllTabs() {
    return localStorage.getItem("tabsInfo") ? JSON.parse(localStorage.getItem("tabsInfo")) : [];
}

// add Listener to onCreated
// get the new tab and put it to queue head.
chrome.tabs.onCreated.addListener( (tab) => {
    var _all = getAllTabs();
    setAllTabs([tab].concat(_all));
})

// add Listener to onActivated
// find the activated tab and put it to queue head.

chrome.tabs.onActivated.addListener( (activeInfo) => {
    var _temp,
        _all = getAllTabs(),
        _index;

    _all.forEach( (oneTab, i) => {
        // if the updated tab is already in the tabs, return index
        if (oneTab.id == activeInfo.tabId) {
            _index = i;
            return;
        }
    });

    _temp = _all.splice(_index, 1);
    setAllTabs(_temp.concat(_all));
})

// add Listenter to onUpdated
// find the updated tab(when url, title and some attributes change) and update it.
chrome.tabs.onUpdated.addListener( (tabId, changeInfo, tab) => {
    if (changeInfo.status == "complete") {
        var _all = getAllTabs(), _index;

        _all.forEach( (oneTab, i) => {
            // if the updated tab is already in the tabs, return index
            if (oneTab.id == tabId) {
                _index = i;
                return;
            }
        });

        _all.splice(_index, 1, tab);
        setAllTabs(_all);
    }
});

// add Listener to onRemoved
chrome.tabs.onRemoved.addListener( (tabId, removeInfo) => {
    if (removeInfo.isWindowClosing) {
        localStorage.removeItem("tabsInfo");
    } else {
        var _all = getAllTabs(),
            _index;

        _all.forEach( (oneTab, i) => {
            // if the updated tab is already in the tabs, return index
            if (oneTab.id == tabId) {
                _index = i;
                return;
            }
        });

        _all.splice(_index, 1);
        setAllTabs(_all);
    }
})