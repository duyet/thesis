module.exports = function (Thesis) {

  var handleAttchment;

  Thesis.observe('before save', function(ctx, next) {
    console.log("before: ", ctx.instance)
    if (ctx.data && ctx.data.attachments) {
      handleAttchment = ctx.data.attachments;
      console.log("I got ", handleAttchment)
    }

    next();
  });

  Thesis.observe('after save', function(ctx, next) {
    console.log("after: ", ctx.instance)
    if (handleAttchment) {
      console.log("I have ", handleAttchment)
      ctx.instance.attachments.build(handleAttchment)
    }
    console.log("============> ",ctx.instance)

    next();
  });

};
