function initialSetup(){
    var s = document.createElement('script');
    s.src = chrome.runtime.getURL('/js/script.js');
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}
initialSetup();