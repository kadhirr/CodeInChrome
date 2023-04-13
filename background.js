var store = {};

chrome.action.onClicked.addListener(function (activeTab) {
    chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"), type:
            "popup", height: 800, width: 800
    });
});

chrome.contextMenus.create({
    id: "leetcode-handler",
    title: "Replace Leetcode Editor",
    contexts: ["page"],
    documentUrlPatterns: ["https://leetcode.com/problems/*"],
})

var editor_port;
var leetcode_port;

chrome.runtime.onConnectExternal.addListener(function(port){
    leetcode_port = port;
});


chrome.runtime.onConnect.addListener( (port) => {
    console.log(["Connected",port]);
    port.postMessage({action: 'setCode',payload: store.code});
    editor_port = port;
    editor_port.onMessage.addListener((message,port)=>{
        console.log(message,port);
        leetcode_port.postMessage(message);
    });
})




chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        console.log(["EXTERNAL",request]);
        store.code = request.code;
    });
chrome.contextMenus.onClicked.addListener((info,tab) => {

      chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"), type:
            "popup", height: 800, width: 800
    });
    chrome.runtime.onConnect.addListener(function(port) {
        port.onMessage.addListener(function(msg) {
          console.log(msg);
        });
      });
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['js/leetcode_integration.js']
    })



});