var App = angular.module('myApp', ['LocalStorageModule', 'AuthApp']);

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

App.controller('TeacherCtrl', function ($scope, $http, $window) {
    $scope.controllerName = "TeacherCtrl";
    GetAll();
    function GetAll() {
        debugger;
        $http.get('/api/Teacher').then(function (response) { $scope.Teacher = response.data },
            function () { alert("Failed To Get") });
    }
    $scope.InsertTeacher = function (Teacher) {
        var data = {
            firstName: Teacher.firstName,
            lastName: Teacher.lastName,
            username: Teacher.username,
            password: Teacher.password,
            Email: Teacher.Email,
            Course: Teacher.Course
        };

        $scope.registration = {
            Email: Teacher.username,
            Password: Teacher.password,
            ConfirmPassword: Teacher.password
        };
        debugger;
        $scope.isProcessing = true;
        $scope.RegisterBtnText = "Please wait...";
        $http.post('/api/account/register', $scope.registration).then(function (response) {
            debugger;
            if (response)
                $http.post('/api/Teacher', JSON.stringify(data)).then(function (response) {
                    if (response.data)
                        alert('Registration successful');
                    $window.location.href = "/View/TeacherLogin.html";
                }, function (response) {
                    alert("Failed to insert")
                });
        }, function () {
            alert("Error occured. Please try again.");
            $scope.isProcessing = false;
            $scope.RegisterBtnText = "Register";
        });
    }
 
    $scope.onDelete = function (Teacher) {
        var data = {
            firstName: Teacher.firstName,
            lastName: Teacher.lastName,
            username: Teacher.username,
            password: Teacher.password
        };
        $http.delete('/api/Teacher/' + Teacher.id, JSON.stringify(data)).then(function (response) {
            if (response.data)
                $scope.msg = "Deleted Successfully!";
            GetAll();
        }, function (response) {
            $scope.msg = "Service not Exists";
        });
    }
})

App.controller('StudentCtrl', function ($scope, $http) {
    $scope.controllerName = "StudentCtrl";
    GetAll();
    function GetAll() {
        debugger;
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
            Teacher: Student.Teacher
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
               //     $window.location.href = "/View/StudentLogin.html";
                }, function (response) {
                    alert("Failed to insert")
                });
        }, function () {
            alert("Error occured. Please try again.");
            $scope.isProcessing = false;
            $scope.RegisterBtnText = "Register";
        });
    }

    $scope.onDelete = function (Student) {
        var data = {
            firstName: Student.firstName,
            lastName: Student.lastName,
            username: Student.username,
            password: Student.password
        };
        $http.delete('/api/Student/' + Student.id, JSON.stringify(data)).then(function (response) {
            if (response.data)
                $scope.msg = "Deleted Successfully!";
            GetAll();
        }, function (response) {
            $scope.msg = "Service not Exists";
        });
    }
})

App.controller("CourseCtrl", function ($scope, $http) {
    $scope.controllerName = "CourseCtrl";
    GetAll();
    function GetAll() {
        $http.get('/api/Course').then(function (response) { $scope.Course = response.data },
            function () { alert("Failed To Get") });
    }

    $scope.AddCourse = function (Course) {
        var data = {
            CName: Course.CName,
            Duration: Course.Duration,
            Contents: Course.Contents,
            Teacher: userName
        };
        $http.post('/api/Course', JSON.stringify(data)).then(function (response) {
            if (response.data)
                alert("inserted succesfully")
        }, function (response) {
            alert("Failed to insert")
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

    $scope.PostShare = function (Post) {
        var data = {
            Teacher: userName,
            Share: Post.Share
        };
        $http.post('/api/PostShare', JSON.stringify(data)).then(function (response) {
            if (response.data)
                alert("inserted succesfully")
        }, function (response) {
            alert("Failed to insert")
        });
    }

    GetPosts();
    function GetPosts() {
        $http.get('/api/PostShare').then(function (response) { $scope.Post = response.data },
            function () { alert("Failed To Get") });
    }

})

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
