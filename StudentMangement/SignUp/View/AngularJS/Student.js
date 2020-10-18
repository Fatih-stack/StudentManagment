var App = angular.module("StudentApp", [])
App.controller("StdntCtrl", ['$scope', '$window', '$http',
    function ($scope, $window, $http) {
        $scope.init = function () {
            $scope.isProcessing = false;
            $scope.RegisterBtnText = "Register";
        };
        GetAll();
        function GetAll() {
            $http.get('/api/Student').then(function (response) { $scope.Student = response.data },
                function () { alert("Failed To Get") });
        }
        $scope.InsertStd = function (Student) {
            var data = {
                firstName: Student.firstName,
                lastName: Student.lastName,
                username: Student.username,
                password: Student.password,
                Email: Student.Email,
                Course: Student.Course,
                Teacher: Student.Teacher,
            };
            $scope.registration = {
                Email: Student.username,
                Password: Student.password,
                ConfirmPassword: Student.password
            };
            debugger;
            $scope.isProcessing = true;
            $scope.RegisterBtnText = "Please wait...";
            $http.post('/api/account/register', $scope.registration).then(function (response) {
                debugger;
                if (response)
                    $http.post('/api/Student', JSON.stringify(data)).then(function (response) {
                        if (response.data)
                            alert('Registration successful');
                        $window.location.href = "/View/StudentLogin.html";
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
