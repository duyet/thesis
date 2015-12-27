(function () {
  'use strict';
  angular
    .module('com.module.front')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.front', {
          abstract: true,
          url: '/front',
          templateUrl: 'modules/front/views/main.html',
          controller: function($scope) {
            // Hide sidebar
            var $ = angular.element;
            if (true) {
              $('.row-offcanvas').toggleClass('active');
              $('.left-side').removeClass('collapse-left');
              $('.right-side').removeClass('strech');
              $('.row-offcanvas').toggleClass('relative');
            } 

            $scope.items = [{
              name: 'Home',
              sref: '.home'
            }, {
              name: 'CoreService',
              sref: '.view'
            }, {
              name: 'Autofields',
              sref: '.view'
            }, {
              name: 'Bootstrap',
              sref: '.view'
            }];

            $scope.tags = [{
              name: 'Home',
              sref: '.home'
            }, {
              name: 'CoreService',
              sref: '.view'
            }, {
              name: 'Autofields',
              sref: '.view'
            }, {
              name: 'Bootstrap',
              sref: '.view'
            }];
          }
        })
        .state('app.front.home', {
          url: '',
          templateUrl: 'modules/front/views/home.html',
          controllerAs: 'ctrl',
          controller: function (thesis) {
            this.thesis = thesis;
          },
          resolve: {
            thesis: [
              'ThesisService',
              function (ThesisService) {
                return ThesisService.getPosts();
              }
            ]
          }
        })
        .state('app.front.list', {
          url: '',
          templateUrl: 'modules/front/views/list.html',
          controllerAs: 'ctrl',
          controller: function (thesis) {
            this.thesis = thesis;
          },
          resolve: {
            thesis: [
              'ThesisService',
              function (ThesisService) {
                return ThesisService.getPosts();
              }
            ]
          }
        })
        .state('app.front.add', {
          url: '/add',
          templateUrl: 'modules/front/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, FileUploader, CoreService, ThesisService, thesis) {
            var self = this;
            this.thesis = thesis;
            this.thesis.attachments = [];
            // See: http://nervgh.github.io/pages/angular-file-upload/examples/simple/controllers.js
            this.uploader = new FileUploader({
              url: CoreService.env.apiUrl + 'containers/files/upload'
            });

            this.uploader.onCompleteItem = function(fileItem, response, status, headers) {
              console.log(fileItem)
              console.log(response)
              if (response && response.result && response.result.files && response.result.files.file) {
                var attach = {
                  name: response.result.files.file[0].name,
                  url: CoreService.env.apiUrl + 'containers/files/download/' + response.result.files.file[0].name
                }
                self.thesis.attachments.push(attach);
              }
            };


            this.formFields = ThesisService.getFormFields();
            this.formOptions = {};
            this.submit = function (attach) {
              var attach = attach || false;
              var that = this;
              ThesisService.upsertPost(this.thesis, function(post) {
                  if (attach) $state.go('^.edit', {id: post.id});
              }).then(function () {
                if (!attach) $state.go('^.list');
              });
            };
          },
          resolve: {
            thesis: function () {
              return {};
            }
          }
        })
        .state('app.front.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/front/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, FileUploader, CoreService, ThesisService, thesis) {
            console.log(thesis);
            this.thesis = thesis;

            // See: http://nervgh.github.io/pages/angular-file-upload/examples/simple/controllers.js
            this.uploader = new FileUploader({
              url: CoreService.env.apiUrl + 'containers/files/upload'
            });

            this.formFields = ThesisService.getFormFields();
            this.formOptions = {};
            this.submit = function (attach) {
              var attach = attach || false;
              var that = this;
              ThesisService.upsertPost(this.thesis, function(post) {
                  if (attach) $state.go('^.edit', {id: post.id});
              }).then(function () {
                if (!attach) $state.go('^.list');
              });
            };
          },
          resolve: {
            thesis: function ($stateParams, ThesisService) {
              return ThesisService.getPost($stateParams.id);
            }
          }
        })
        .state('app.front.view', {
          url: '/view/:id',
          templateUrl: 'modules/front/views/view.html',
          controllerAs: 'ctrl',
          controller: function (thesis) {
            this.thesis = thesis;
          },
          resolve: {
            thesis: function ($stateParams, ThesisService) {
              return ThesisService.getPost($stateParams.id);
            }
          }
        })
        .state('app.front.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, ThesisService, thesis) {
            ThesisService.deletePost(thesis.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            thesis: function ($stateParams, ThesisService) {
              return ThesisService.getPost($stateParams.id);
            }
          }
        });
    }
  );

})();
