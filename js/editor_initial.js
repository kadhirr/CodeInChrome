requirejs.config({
    paths: { ace: ['/ace-builds/src/'] }
});

var global_editor;
/*
https://groups.google.com/g/ace-discuss/c/BFbcl9b5Ma0 This link helped solve the problem of unable to implement autocomplete
*/
document.getElementById("language-editor").value = "ace/mode/javascript";
requirejs(['ace/ace',"ace/ext-language_tools"], function(ace) {
    var editorInstance = ace.edit('editor');
    editorInstance.session.setMode("ace/mode/javascript");
    editorInstance.setTheme("ace/theme/twilight");
    editorInstance.getSession().setUseWorker(false);
    // console.log(ace);
    // console.log(editor);
    ace.config.loadModule('ace/ext/language_tools', function () {
        editorInstance.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
        })
    });    
    editorInstance.resize();
    console.log("Instance",editorInstance);
    global_editor = editorInstance;

    editorInstance.getSession().on('change', function() {
        port.postMessage({
            action: 'saveCode',
            payload: editorInstance.getValue()
        });
      });

/* EVENT LISTENERS */

// Event Listener to switch languages
document.querySelector("#language-editor").addEventListener("change",function selectOption(event){
    // console.log(event);
    editorInstance.session.setMode(document.querySelector("#language-editor").value);
});

// Event Listener for Clipboard copy
document.querySelector("#clipboard-copy").addEventListener("click",(event) => {
    navigator.clipboard.writeText(editor.getValue());

})

document.querySelector("#download-code").addEventListener("click",(event)=>{
    let docContent = editor.getValue();
let doc = URL.createObjectURL( new Blob([docContent], {type: 'application/octet-binary'}) );
chrome.downloads.download({ url: doc,
    saveAs:   true});
});


/* MESSAGE LISTENERS */

var port = chrome.runtime.connect({name: "editor-channel"});
port.onMessage.addListener((message) => {
    console.log(["EDITOR MESSAGE",message]);
    if (message.action = "setCode"){
        console.log(editor);
        console.log(global_editor.setValue(message.payload));
    }
})

})

