editorExtensionId = "adhoohddhnmndbfjfggheadgcifkdiel";
chrome.runtime.sendMessage(editorExtensionId, {code: window.monaco.editor.getModels()[0].getValue()},
    function(response) {
      console.log(response);
    });

var connector = chrome.runtime.connect(editorExtensionId);
connector.onMessage.addListener((message)=>{
    console.log("A",message);
    if (message.action == 'saveCode'){
        window.monaco.editor.getModels()[0].setValue(message.payload);
    }
});