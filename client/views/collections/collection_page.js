Template.collectionPage.helpers({
  notes: function () {
    FlowRouter.watchPathChange();
    var id = FlowRouter.getParam('id');
    var collection = Collections.findOne(id);

    return Notes.find({"tagIds": collection._id});
  }
});

Template.collectionPage.onCreated(function() {
  var self = this;

  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleTag', id);
  });
});
