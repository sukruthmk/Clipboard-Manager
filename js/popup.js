// document.addEventListener('DOMContentLoaded', function () {
//     var checkPageButton = document.getElementById('checkPage');
//     checkPageButton.addEventListener('click', function() {
//         chrome.tabs.getSelected(null, function(tab) {
//             d = document;
//
//             var f = d.createElement('form');
//             f.action = 'http://gtmetrix.com/analyze.html?bm';
//             f.method = 'post';
//             var i = d.createElement('input');
//             i.type = 'hidden';
//             i.name = 'url';
//             i.value = tab.url;
//             f.appendChild(i);
//             d.body.appendChild(f);
//             f.submit();
//         });
//     });
// });
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

        $scope.todos = [];
        for (var i = 0; i < 15; i++) {
            $scope.todos.push({
                face: imagePath,
                what: "Brunch this weekend?",
                who: "Min Li Chan",
                notes: "I'll be in your neighborhood doing errands."
            });
        }
    });
