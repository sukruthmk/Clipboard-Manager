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
            if (pasteText != self.prevText) {
                DatabaseManager.save({
                    text: pasteText
                });
                self.storedData.push(pasteText);
                self.prevText = pasteText;
            }
        }, 1500);
    }
}


$(document).ready(function() {
    $(document).on("db-initialized", function() {
        // Call initialize method to start the setInterval
        BackGround.initialize();
    });
});
