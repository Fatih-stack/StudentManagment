/// <reference path="angular.js" />
var loginApp = angular.module('loginApp', ['LocalStorageModule', 'AuthApp']);

loginApp.config(function ($httpProvider) {
    debugger;
    $httpProvider.interceptors.push('authInterceptorService');
})

loginApp.controller('loginController', ['$scope', '$window', 'authService', function ($scope, $window, authService) {
    $scope.init = function () {
        debugger;
        $scope.isProcessing = false;
        $scope.LoginBtnText = "Sign In";
    }

    $scope.init();

    $scope.loginData = {
        userName: "",
        password:""
    }
    
    $scope.Login = function () {
        $scope.isProcessing = true;
        $scope.LoginBtnText = "Signing in.....";
        debugger;
        authService.login($scope.loginData).then(function (response) {
            alert("Login Successfully");
            $window.location.href = "AdminDashboard.html";
        }, function () {
            alert("Failed.Please try again.");
            $scope.init();
        })
    }

}])