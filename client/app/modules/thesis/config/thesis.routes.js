(function () {
  'use strict';
  angular
    .module('com.module.thesis')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.thesis', {
          abstract: true,
          url: '/thesis',
          templateUrl: 'modules/thesis/views/main.html'
        })
        .state('app.thesis.list', {
          url: '',
          templateUrl: 'modules/thesis/views/list.html',
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
        .state('app.thesis.add', {
          url: '/add',
          templateUrl: 'modules/thesis/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, FileUploader, CoreService, ThesisService, thesis) {
            this.thesis = thesis;

            // See: http://nervgh.github.io/pages/angular-file-upload/examples/simple/controllers.js
            this.uploader = new FileUploader({
              url: CoreService.env.apiUrl + '/containers/files/upload',
            });
            this.formFields = ThesisService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              ThesisService.upsertPost(this.thesis).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            thesis: function () {
              return {};
            }
          }
        })
        .state('app.thesis.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/thesis/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, ThesisService, thesis) {
            console.log(thesis);
            this.thesis = thesis;
            this.formFields = ThesisService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              ThesisService.upsertPost(this.thesis).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            thesis: function ($stateParams, ThesisService) {
              return ThesisService.getPost($stateParams.id);
            }
          }
        })
        .state('app.thesis.view', {
          url: '/:id',
          templateUrl: 'modules/thesis/views/view.html',
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
        .state('app.thesis.delete', {
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
