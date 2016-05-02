'use strict';

angular.module('myApp.jokes', [])
    .controller('JokesCtrl', ['$http', '$auth', '$rootScope', '$state', '$q' , function($http, $auth, $rootScope, $state, $q) {

        var vm = this;
        var server = 'https://ionic-joke-api-ejpenner.c9users.io';

        vm.jokes = [];
        vm.error;
        vm.joke;

        // vm.lastpage=1;
        // vm.init = function() {
        //     vm.lastpage=1;
        //     $http({
        //         url: server + 'api/v1/jokes',
        //         method: "GET",
        //         params: {page:  vm.lastpage}
        //     }).success(function(jokes, status, headers, config) {
        //         vm.jokes = jokes[0].data;
        //         vm.currentpage = jokes[0].current_page;
        //     });
        // };
        // vm.init();
        //
        // $http.get( server +'/api/v1/jokes').success(function(jokes){
        //     console.log(jokes);
        //     vm.jokes = jokes.data;
        // }).error(function(error){
        //     vm.error = error;
        // });

        vm.lastpage=1;
        vm.init = function() {
            vm.lastpage=1;
            $http({
                url: server + '/api/v1/jokes',
                method: "GET",
                params: {page:  vm.lastpage}
            }).success(function(jokes, status, headers, config) {
                vm.jokes = jokes[0].data;
                vm.currentpage = jokes.current_page;
            });
        };
        vm.init();

        vm.loadMore = function() {
            vm.lastpage +=1;
            $http({
                url: server + '/api/v1/jokes',
                method: "GET",
                params: {page:  vm.lastpage}
            }).success(function (jokes, status, headers, config) {

                vm.jokes = vm.jokes.concat(jokes[0].data);

            });
        };

        vm.addJoke = function() {

            $http.post( server + '/api/v1/jokes', {
                body: vm.joke,
                user_id: $rootScope.currentUser.id
            }).success(function(response) {
                // console.log(vm.jokes);
                // vm.jokes.push(response.data);
                vm.jokes.unshift(response.data);
                console.log(vm.jokes);
                vm.joke = '';
                // alert(data.message);
                // alert("Joke Created Successfully");
            }).error(function(){
                console.log("error");
            });
        };

        vm.updateJoke = function(joke){
            console.log(joke);
            $http.put( server + '/api/v1/joke/' + joke.joke_id, {
                body: joke.joke,
                user_id: $rootScope.currentUser.id
            }).success(function(response) {
                // alert("Joke Updated Successfully");
            }).error(function(){
                console.log("error");
            });
        };


        vm.deleteJoke = function(index, jokeId){
            console.log(index, jokeId);

            $http.delete( server + '/api/v1/joke/' + jokeId)
                .success(function() {
                    vm.jokes.splice(index, 1);
                });
        }
    }])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('jokes', {
                url: '/jokes',
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'auth'
                    }
                },
                views: {
                    'jokesContent': {
                        templateUrl: "view-jokes/jokes.html",
                        controller: 'JokesCtrl as jokes'
                    }
                }
            });
    }])
   