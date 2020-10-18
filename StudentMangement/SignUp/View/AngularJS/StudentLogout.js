/// <reference path="angular.js" />
var StudentlogoutApp = angular.module('StudentlogoutApp', ['LocalStorageModule', 'AuthApp']);
debugger;


StudentlogoutApp.controller('StudentlogoutController', ['$scope', '$window', 'authService', function ($scope, $window, authService) {
    $scope.LogOut = function () {
        debugger;
        authService.logOut();
        $window.location.href = "StudentLogin.html";
    }
    debugger;
    $scope.userName = _authentication.userName;
    if (!_authentication.isAuth)
        $window.location.href = "StudentLogin.html";
}])