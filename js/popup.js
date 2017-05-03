angular.module('clipboardManager', ['ngMaterial'])

    .config(function($mdIconProvider) {
        // Load the svg icons
        $mdIconProvider
            .icon('search', 'assets/icons/ic_search_black_24px.svg')
            .icon('favorite', 'assets/icons/ic_favorite_black_24px.svg')
            .icon('history', 'assets/icons/ic_history_black_24px.svg')
            .icon('settings', 'assets/icons/ic_settings_black_24px.svg')
    })

    .controller('AppCtrl', function($scope) {
        var imagePath = 'img/list/60.jpeg';

        $scope.clipboard = [];
        // for (var i = 0; i < 15; i++) {
        //     $scope.clipboard.push({
        //         face: imagePath,
        //         what: "Brunch this weekend?",
        //         who: "Min Li Chan",
        //         notes: "I'll be in your neighborhood doing errands."
        //     });
        // }
    })

    .filter('reverse', function() {
      return function(items) {
        return items.slice().reverse();
      };
    })


document.addEventListener('DOMContentLoaded', function() {
    // if("indexedDB" in window) {
    //
    // } else {
    //     // implement backward compatability if indexedDB is not present
    //
    // }
    var appElement = document.querySelector('[ng-controller=AppCtrl]');
    var $scope = angular.element(appElement).scope();
    // $scope.$apply(function() {
    //     $scope.data.age = 20;
    // });
    var prevText = false;
    var startInterval = function() {
        setInterval(function() {
            var pasteText = ClipboardManager.getClipboard();
            if(pasteText != prevText) {
                DatabaseManager.save({text: pasteText});
                $scope.$apply(function() {
                    $scope.clipboard.push({
                        text: pasteText
                    });
                });
                prevText = pasteText;
            }
        }, 1500);
    }
    setTimeout(function(){
        DatabaseManager.get().done(function(data) {
            if(typeof data == "object") {
                for (var key in data) {
                    var tempData = data[key];
                    var text = tempData.value.text;
                    $scope.$apply(function() {
                        $scope.clipboard.push({
                            text: text
                        });
                    });
                }
                var lastData = data[Object.keys(data)[Object.keys(data).length - 1]];
                prevText = lastData.value.text;
                startInterval();
            }
            // var pasteText = ClipboardManager.getClipboard();
            // DatabaseManager.save({text: pasteText});
            // DatabaseManager.get().done(function(data) {
            //     console.log(data);
            // });
        });
    }, 3000)


    // setInterval(function() {
    //     var pasteText = ClipboardManager.getClipboard();
    //     // DatabaseManager.get().done(function(data) {
    //     //     if()
    //     // });
    //     DatabaseManager.save({text: pasteText});
    // }, 1500);
});
