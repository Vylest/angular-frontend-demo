'use strict';

angular.module('myApp.auth', [])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('auth', {
                url: '/auth',
                data: {
                    permissions: {
                        except: ['isloggedin'],
                        redirectTo: 'jokes'
                    }
                },
                views: {
                    'jokesContent': {
                        templateUrl: "view-auth/auth.html",
                        controller: 'AuthCtrl as auth'
                    }
                }
            })
            .state('register',{
                url: '/register',
                data: {
                    permissions: {
                        only: ['anonymous'],
                        redirectTo: 'jokes'
                    }
                },
                views: {
                    'jokesContent': {
                        templateUrl: "view-auth/register.html",
                        controller: 'AuthCtrl as auth'
                    }
                }
            })
    }])

    .controller('AuthCtrl', ['$auth', '$state', '$http', '$rootScope', function($auth, $state, $http, $rootScope) {

        var vm = this;
        var server = 'https://ionic-joke-api-ejpenner.c9users.io/';
        vm.loginError = false;
        vm.loginErrorText;

        vm.login = function() {

            var credentials = {
                email: vm.email,
                password: vm.password
            }

            $auth.login(credentials).then(function() {
                // Return an $http request for the authenticated user
                $http.get( server + 'api/v1/authenticate/user').success(function(response){
                        // Stringify the retured data
                        var user = JSON.stringify(response.user);

                        // Set the stringified user data into local storage
                        localStorage.setItem('user', user);

                        // Getting current user data from local storage
                        $rootScope.currentUser = response.user;

                        $state.go('jokes');
                    })
                    .error(function(){
                        vm.loginError = true;
                        vm.loginErrorText = error.data.error;
                        console.log(vm.loginErrorText);
                    })
            });
        };

        vm.register = function () {
            var credentials = {
                email: vm.email,
                password: vm.password,
                name: vm.password
            }

            console.log(credentials);

            $auth.signup(credentials).then(function (response) {
                $state.go('auth');
            });

        };

        vm.register = function() {
            var registerData = {
                email: vm.email,
                name: vm.name,
                password: vm.password
            };

            $auth.signup(registerData).then(function () {
                $state.go('auth');
            })
        };
    }]);