var ClipboardManager = {

    getClipboard: function() {
        var pasteTarget = document.createElement("div");
        pasteTarget.contentEditable = true;
        var actElem = document.activeElement.appendChild(pasteTarget).parentNode;
        pasteTarget.focus();
        document.execCommand("Paste", null, null);
        var paste = pasteTarget.innerText;
        actElem.removeChild(pasteTarget);
        return paste;
    },

    copyToClipboard: function(text) {
        var copyTarget = document.createElement('textarea');
        copyTarget.value = text;
        document.body.appendChild(copyTarget);
        copyTarget.select();
        document.execCommand('copy');
        copyTarget.remove();
    }

}
