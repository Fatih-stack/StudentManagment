/// <reference path="angular.js" />
var logoutApp = angular.module('logoutApp', ['LocalStorageModule', 'AuthApp']);
debugger;


logoutApp.controller('logoutController', ['$scope', '$window', 'authService', function ($scope, $window, authService) {
        $scope.LogOut = function () {
        debugger;
        authService.logOut();
        $window.location.href = "AdminLogin.html";
    }
    debugger;
    $scope.userName = _authentication.userName;
    if (!_authentication.isAuth)
        $window.location.href = "AdminLogin.html";
    //loginApp.run(['authService', function (authService) {
    //    debugger;
    //    authService.fillAuthData();
    //}])
}])