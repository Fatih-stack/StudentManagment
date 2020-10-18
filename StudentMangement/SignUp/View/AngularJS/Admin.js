var App = angular.module('myApp', ['LocalStorageModule', 'AuthApp']);

App.config(function ($httpProvider) {
    debugger;
    $httpProvider.interceptors.push('authInterceptorService');
})

App.controller('logoutController', ['$scope', '$window', 'authService', function ($scope, $window, authService) {
    $scope.controllerName = 'logoutController';
    $scope.LogOut = function () {
        debugger;
        authService.logOut();
        $window.location.href = "AdminLogin.html";
    }
    debugger;
    $scope.userName = _authentication.userName;
    if (!_authentication.isAuth)
        $window.location.href = "AdminLogin.html";
}])

App.controller("AdminCtrl", ['$scope', '$window', '$http', 'authService', 
    function ($scope, $window, $http, authService) {

        $scope.LogOut = function () {
            debugger;
            authService.logOut();
            $window.location.href = "AdminLogin.html";
        }
        debugger;
        $scope.userName = _authentication.userName;

        $scope.initR = function () {
            $scope.isProcessing = false;
            $scope.RegisterBtnText = "Register";
        };

        $scope.init = function () {
            debugger;
            $scope.isProcessing = false;
            $scope.LoginBtnText = "Sign In";
        }

        $scope.init();

        $scope.loginData = {
            userName: "",
            password: ""
        }

        GetAll();
        function GetAll() {
            $http.get('/api/Admin').then(function (response) { $scope.Admin = response.data },
                function () { alert("Failed To Get") });
        }

        $scope.Login = function () {
            $scope.isProcessing = true;
            $scope.LoginBtnText = "Signing in.....";
            debugger;
            $http.get('/api/Admin').then(function (response) { $scope.Admin = response.data },
                function () { alert("Failed To Get") });
            var adm;
            for (adm in $scope.Admin) {
                if ($scope.Admin[adm].username == $scope.loginData.userName &&
                    $scope.Admin[adm].password == $scope.loginData.password) {
                    debugger;
                    authService.login($scope.loginData).then(function (response) {
                        alert("Login Successfully");
                        $window.location.href = "AdminDashboard.html";
                    }, function () {
                        alert("Failed.Please try again.");
                        $scope.init();
                    })
                }
            }
            $scope.isProcessing = false;
            $scope.LoginBtnText = "Sign in";
            $scope.loginData.userName = "";
            $scope.loginData.password = "";
           
        }

        $scope.InsertAdm = function (Admin) {
            var data = {
                firstName: Admin.firstName,
                lastName: Admin.lastName,
                username: Admin.username,
                password: Admin.password
            };
            $scope.registration = {
                Email: Admin.username,
                Password: Admin.password,
                ConfirmPassword: Admin.password
            };
            debugger;
            $scope.isProcessing = true;
            $scope.RegisterBtnText = "Please wait...";
            $http.post('/api/account/register', $scope.registration).then(function (response) {
                debugger;
                if (response)
                    $http.post('/api/Admin', JSON.stringify(data)).then(function (response) {
                        if (response.data)
                            alert('Registration successful');
                        $window.location.href = "/View/AdminLogin.html";
                    }, function (response) {
                        alert("Failed to insert")
                    });
            }, function () {
                alert("Error occured. Please try again.");
                $scope.isProcessing = false;
                $scope.RegisterBtnText = "Register";
            });
        }
    }]);

App.factory('signUpService', ['$http', function ($http) {

    var signUpServiceFactory = {};

    signUpServiceFactory.saveRegistration = function (registration) {
        return $http.post('/api/account/register', registration)
    };

    return signUpServiceFactory;
}]);