(function () {
  'use strict';
  angular
    .module('com.module.thesis')
    .service('ThesisService', function (CoreService, Thesis, gettextCatalog) {
      this.getPosts = function () {
        return Thesis.find({
          filter: {
            order: 'created DESC',
            include: ['attachments']
          }
        }).$promise;
      };

      this.getPost = function (id) {
        return Thesis.findById({
          id: id
        }, {include: ['attachments']}).$promise;
      };

      this.upsertPost = function (post, cb) {
        return Thesis.upsert(post).$promise
          .then(function (post) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Post saved'),
              gettextCatalog.getString('Your post is safe with us!')
            );
            cb(post)
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving post '),
              gettextCatalog.getString('This post could no be saved: ') + err
            );
          }
        );
      };

      this.deletePost = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Thesis.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Post deleted'),
                gettextCatalog.getString('Your post is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting post'),
                gettextCatalog.getString('Your post is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function () {
        return [
          {
            key: 'thesis_name',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Thesis name'),
              required: true
            }
          },
          {
            key: 'intro',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Short intro'),
              required: true
            }
          },
          {
            key: 'score_instructor',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Score instructor'),
              type: 'number'
            }
          },
          {
            key: 'score_reviewer',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Score reviewer'),
              type: 'number'
            }
          },
          {
            key: 'score_council',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Score council'),
              type: 'number'
            }
          },
          {
            key: 'score_total',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Score total'),
              type: 'number'
            }
          },
          {
            key: 'have_disk',
            type: 'checkbox',
            templateOptions: {
              label: gettextCatalog.getString('Have disk'),
              type: 'checkbox'
            }
          },
          {
            key: 'status',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('status'),
              "options": [
                  {
                    "name": "Active",
                    "value": "active"
                  },
                  {
                    "name": "Disabled",
                    "value": "disactive"
                  }
                ]
            }
          },
          {
            key: 'note',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Note'),
            }
          },
        ];
      };

    });

})();
