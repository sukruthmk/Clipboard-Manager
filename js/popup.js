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
        $scope.clipboard = [];

        // Get the data from background to inprove performance.
        chrome.runtime.getBackgroundPage(function (backgroundPage) {
            var background = backgroundPage.BackGround;
            var storedData = background.storedData;
            $.each(storedData, function(index, value) {
                $scope.clipboard.push({
                    text: value
                });
            });
        });
    })

    .filter('reverse', function() {
      return function(items) {
        return items.slice().reverse();
      };
    })
