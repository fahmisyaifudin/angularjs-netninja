var myNinjaApp = angular.module('myNinjaApp', ['ngRoute']);

myNinjaApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'NinjaController'
        })
        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'NinjaController'
        }).otherwise({
            redirectTo: '/home'
        })
}]);

myNinjaApp.directive('randomNinja', [function() {
    return {
        restrict: 'E',
        scope: {
            ninjas: '=',
            title: '='
        },
        templateUrl: 'views/random.html',
        transclude: true,
        replace: true,
        controller: function($scope) {
            $scope.random = Math.floor(Math.random() * 4);
        }
            
        
    };
}])

myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http){
    $scope.removeNinja = function (ninja) {
        var removedNinja = $scope.ninjas.indexOf(ninja);
        $scope.ninjas.splice(removedNinja, 1);
    }
    $scope.submitNinja = function() {
        var submit = {
            name: $scope.newninja.name,
            belt: $scope.newninja.belt,
            rate: $scope.newninja.rate,
            available: true
        }
        $scope.ninjas.push(submit);
    }

    $http({
        method: 'GET',
        url: 'data/ninjas.json',
    }).then(function(res) {
        $scope.ninjas = res.data;
    });

}]);