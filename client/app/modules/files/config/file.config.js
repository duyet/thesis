(function () {
  'use strict';
  angular
    .module('com.module.files')
    .run(function ($rootScope, $http, CoreService, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Thesis files'), 'app.files.list', 'fa-file');

      $http.get(CoreService.env.apiUrl + '/containers/files/files').success(
        function (data) {
          $rootScope.addDashboardBox(gettextCatalog.getString('Thesis files'), 'bg-blue', 'ion-paperclip', data.length, 'app.files.list');
        });

    });

})();
