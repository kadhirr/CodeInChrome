requirejs.config({
    paths: { ace: ['/ace-builds/src/'] }
});

let global_editor;
/*
https://groups.google.com/g/ace-discuss/c/BFbcl9b5Ma0 This link helped solve the problem of unable to implement autocomplete
*/
requirejs(['ace/ace',"ace/ext-language_tools"], function(ace) {
    var editor = ace.edit('editor');
    editor.session.setMode("ace/mode/javascript");
    editor.setTheme("ace/theme/twilight");
    editor.getSession().setUseWorker(false);
    console.log(ace);
    console.log(editor);
    ace.config.loadModule('ace/ext/language_tools', function () {
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
        })
    });    
    editor.resize();

/* EVENT LISTENERS */

// Event Listener to switch languages
document.querySelector("#language-editor").addEventListener("change",function selectOption(event){
    // console.log(event);
    editor.session.setMode(document.querySelector("#language-editor").value);
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

})
