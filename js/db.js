var db;
var dbOpenRequest = indexedDB.open("clipboard", 1);
dbOpenRequest.onupgradeneeded = function(e) {
    console.log("upgrading database..");
    var thisDB = e.target.result;
    if (!thisDB.objectStoreNames.contains("history")) {
        thisDB.createObjectStore("history", {
            autoIncrement: true
        });
    }
};

dbOpenRequest.onsuccess = function(e) {
    db = e.target.result;
    console.log("database initialized..");
};

dbOpenRequest.onerror = function(e) {
    console.log("failed to initialize database..", e);
};

var DatabaseManager = {

    // Function to save data into indexedDB
    save: function(data) {
        var transaction = db.transaction(["history"], "readwrite");
        var store = transaction.objectStore("history");
        var d = new Date();
        data.timeStamp = d.toString();
        var storeAddRequest = store.add(data);
        storeAddRequest.onerror = function(e) {
            console.log("error while adding data to store", e.target.error.name);
        }
        storeAddRequest.onsuccess = function(e) {
            console.log("added data in store..");
        }
    }

    // function to get data from indexedDB
    get: function() {
        var records = [];
        var transaction = db.transaction(["history"], "readonly");
        var store = transaction.objectStore("history");
        var cursor = store.openCursor();
        cursor.onsuccess = function(e) {
            var res = e.target.result;
            if (res) {
                if (typeof res.value === 'object' && res.value !== null) {
                    records.push({
                        key: res.key,
                        value: res.value
                    });
                }
                res.continue();
            } else {
                return records;
            }
        }
    }

    // function to delete data in indexedDB
    delete: function(id) {
        var transaction = db.transaction(["history"], "readwrite");
        var store = transaction.objectStore("history");
        if (id) {
            var objectStoreRequest = store.delete(parseInt(id));
            objectStoreRequest.onsuccess = function(event) {
                sendResponse({
                    'success': true
                });
            };
        }
    }
}
