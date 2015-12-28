(function () {
  'use strict';
  angular
    .module('com.module.thesis')
    .service('AttachmentService', function (CoreService, Attachment, gettextCatalog) {
      this.getAttachments = function () {
        return Attachment.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getAttachment = function (id) {
        return Attachment.findById({
          id: id
        }).$promise;
      };

      this.upsertAttachment = function (post, cb) {
        return Attachment.upsert(post).$promise
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

      this.deleteAttachment = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Attachment.deleteById({id: id}, function () {
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
})();
