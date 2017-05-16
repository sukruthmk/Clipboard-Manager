var BackGround = {

    prevText: false,
    storedData: [],

    /*
     * Function to initialize BackGround Script to get the
     * paste text and store it in db
     */
    initialize: function() {
        this.getStoredData();
    },

    /*
     * Function to get the already stored data from the db
     * And store in storedData variable
     */
    getStoredData: function() {
        var self = this;
        DatabaseManager.get().done(function(data) {
            if (typeof data == "object") {
                var text = false;
                for (var key in data) {
                    var tempData = data[key];
                    text = tempData.value.text;
                    self.storedData.push(text);
                }

                // store the last text to prevText variable
                self.prevText = text;
            }

            // self.updateBadge(self.storedData.length);
            self.startInterval();
        });
    },

    /*
     * Function to start the interval to copy the latest paste text
     * And then store that data in the db
     */
    startInterval: function() {
        var self = this;
        setInterval(function() {
            var pasteText = ClipboardManager.getClipboard();
            // If it is a new text then save it to DB
            if (pasteText != self.prevText) {
                self.saveData(pasteText);
            }
        }, 1500);
    },

    saveData: function(pasteText) {
        DatabaseManager.save({
            text: pasteText
        });
        this.storedData.push(pasteText);
        this.prevText = pasteText;
        this.updateBadge(this.storedData.length);

        // Trigger to handle other actions
        chrome.runtime.sendMessage({ action: "update-data", data: pasteText}, function(response) {

        });
    },

    updateBadge: function(number) {
        console.log(number);
        console.log(number.toString());
        // chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
        chrome.browserAction.setBadgeText({
            text: number.toString()
        });
        // chrome.browserAction.setBadgeText({text: number});
    }
}


$(document).ready(function() {
    $(document).on("db-initialized", function() {
        // Call initialize method to start the setInterval
        BackGround.initialize();
    });
});
