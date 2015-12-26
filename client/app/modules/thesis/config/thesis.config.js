(function () {
  'use strict';
  angular
    .module('com.module.thesis')
    .run(function ($rootScope, Thesis, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Thesis'), 'app.thesis.list', 'fa-edit');

      Thesis.find(function (thesis) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Thesis'), 'bg-red', 'ion-document-text', thesis.length, 'app.thesis.list');
      });

    });

})();
