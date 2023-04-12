chrome.action.onClicked.addListener(function(activeTab)
{
    chrome.windows.create({ url: chrome.runtime.getURL("popup.html"), type: 
    "popup" ,height: 800,width: 800});
});
