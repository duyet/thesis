(function () {
  'use strict';
  angular
    .module('com.module.front')
    .run(function ($rootScope, Thesis, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Front page'), 'app.front.home');

      Thesis.find(function (thesis) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Front page'), 'bg-blue', 'ion-document-text', thesis.length, 'app.front.home');
      });

    });

})();
