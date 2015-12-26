'use strict';

// to enable these logs set `DEBUG=boot:01-load-settings` or `DEBUG=boot:*`
var log = require('debug')('boot:01-load-settings');

module.exports = function(app) {

  var Setting = app.models.Setting;

  function loadDefaultSettings() {
    console.error('Creating default settings');

    var settings = [{
      type: 'string',
      key: 'appName',
      value: 'Thesis Management'
    }, {
      type: 'select',
      key: 'appTheme',
      value: 'skin-blue',
      options: [
        'skin-blue',
        'skin-black'
      ]
    }, {
      type: 'select',
      key: 'appLayout',
      value: 'fixed',
      options: [
        'skin-blue',
        'not-fixed'
      ]
    }, {
      type: 'string',
      key: 'formLayout',
      value: 'horizontal'
    }, {
      type: 'int',
      key: 'formLabelSize',
      value: 3
    }, {
      type: 'int',
      key: 'formInputSize',
      value: 9
    }, {
      type: 'boolean',
      key: 'com.module.users.enable_registration',
      value: true
    }];

    settings.forEach(function(setting) {
      Setting.create(setting, function(err) {
        if (err) {
          console.error(err);
        }
      });
    });
  }

  function loadExistingSettings() {
    console.error('Loading existing settings');

    Setting.find(function(data) {
      log(data);
    });
  }


  Setting.count(function(err, result) {
    if (err) {
      console.error(err);
    }
    if (result < 1 && !process.env.INITDB) {
      loadDefaultSettings();
    } else {
      loadExistingSettings();
    }
  });


};
