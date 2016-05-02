'use strict';

angular.module('myApp.upload', [])
    .controller('UploadCtrl', ['$scope', 'fileUpload', '$http', '$auth', '$rootScope', '$state', '$q' , function($scope, fileUpload, $http, $auth, $rootScope, $state, $q) {
        var vm = this;
        vm.files = [];
        vm.file;
        
        var server = 'https://ionic-joke-api-ejpenner.c9users.io';

        // vm.addFile = function() {
        //     console.log($rootScope.currentUser.id);
        //     console.log($scope.file);
        //     $http.post( server + '/api/v1/uploads', {
        //         upload_file: vm.fileInput,
        //         user_id: $rootScope.currentUser.id
        //     }).success(function(response) {
        //         // console.log(vm.jokes);
        //         // vm.jokes.push(response.data);
        //         vm.upload_file.unshift(response.data);
        //
        //         vm.upload_file = '';
        //
        //     }).error(function(){
        //         console.log("error");
        //     });
        // };


        $scope.uploadFile = function(){
            var file = $scope.myFile;
            console.log($rootScope.currentUser.id);
            console.log('file is ' );
            console.dir(file);
            var uploadUrl = server + '/api/v1/uploads';
            fileUpload.uploadFileToUrl(file, uploadUrl);
        };

    }])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('upload', {
            url: '/upload',
            data: {
                permissions: {
                    except: ['anonymous'],
                    redirectTo: 'auth'
                }
            },
            views: {
                'jokesContent': {
                    templateUrl: "uploader/upload.html",
                    controller: 'UploadCtrl as upload'
                }
            }
        })
    }])
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .service('fileUpload', ['$http', '$rootScope', function ($http, $rootScope) {
        this.uploadFileToUrl = function(file, uploadUrl){
            var fd = new FormData();
            fd.append('file', file);
            fd.append('user_id', $rootScope.currentUser.id)
            $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .success(function(){
                })
                .error(function(){
                });
        }
    }]);