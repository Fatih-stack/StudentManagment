﻿var App = angular.module("StudentLoginApp", ['LocalStorageModule', 'AuthApp']);

App.config(function ($httpProvider) {
    debugger;
    $httpProvider.interceptors.push('authInterceptorService');
})

App.controller('StudentlogoutController', ['$scope', '$window', 'authService', function ($scope, $window, authService) {
    $scope.controllerName = "StudentlogoutController";
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

App.controller("StudentLoginController", ['$scope', '$window', '$http', 'authService',
    function ($scope, $window, $http, authService) {
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
            $http.get('/api/Student').then(function (response) { $scope.Student = response.data },
                function () { alert("Failed To Get") });
        }

        $scope.Login = function () {
            GetAll();
            $scope.isProcessing = true;
            $scope.LoginBtnText = "Signing in.....";
            debugger;
            var adm;
            for (adm in $scope.Student) {
                if ($scope.Student[adm].username == $scope.loginData.userName &&
                    $scope.Student[adm].password == $scope.loginData.password) {
                    debugger;
                    authService.login($scope.loginData).then(function (response) {
                        alert("Login Successfully");
                        $window.location.href = "StudentDashboard.html";
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

    }]);

App.controller("CourseCtrl", function ($scope, $http) {
    $scope.controllerName = "CourseCtrl";
    GetAll();
    function GetAll() {
        $http.get('/api/Course').then(function (response) { $scope.Course = response.data },
            function () { alert("Failed To Get") });
    }

    GetAllEnrols();
    function GetAllEnrols() {
        debugger;
        $http.get('/api/EnrolledCours').then(function (response) { $scope.Enrolled = response.data },
            function () { alert("Failed To Get") });
    }

    $scope.DeleteEnroll = function (Course) {
        var data = {
            Teacher: Course.Teacher,
            Course: Course.CName,
            Student: $scope.userName
        };
        debugger;
        $http.delete('/api/EnrolledCours/' + Course.id, JSON.stringify(data)).then(function (response) {
            if (response.data)
                $scope.msg = "Deleted Successfully!";
            GetAllEnrols();
        }, function (response) {
            $scope.msg = "Service not Exists";
        });
    }

    $scope.onDelete = function (Course) {
        var data = {
            CName: Course.CName,
            Duration: Course.Duration,
            Contents: Course.Contents,
            Teacher: Course.Teacher
        };
        $http.delete('/api/Course/' + Course.CourseID, JSON.stringify(data)).then(function (response) {
            if (response.data)
                $scope.msg = "Deleted Successfully!";
            GetAll();
        }, function (response) {
            $scope.msg = "Service not Exists";
        });
    }

    $scope.Enroll = function (Course) {
        var data = {
            Teacher: Course.Teacher,
            Course: Course.CName,
            Student: $scope.userName
        };
        debugger;
        $http.post('/api/EnrolledCours', JSON.stringify(data)).then(function (response) {
            if (response.data)
                alert('Enrolled');
            GetAllEnrols();
        }, function (response) {
            alert("Failed to insert")
        });
    }
})

App.controller("PostCtrl", function ($scope, $http) {
    $scope.controllerName = "PostCtrl";
    GetAll();
    function GetAll() {
        $http.get('/api/PostShare').then(function (response) { $scope.Post = response.data },
            function () { alert("Failed To Get") });
    }
    
})

App.factory('signUpService', ['$http', function ($http) {

    var signUpServiceFactory = {};

    signUpServiceFactory.saveRegistration = function (registration) {
        return $http.post('/api/account/register', registration)
    };

    return signUpServiceFactory;
}]);

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
