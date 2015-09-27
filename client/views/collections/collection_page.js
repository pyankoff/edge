Template.collectionPage.helpers({
  notes: function () {
    return Notes.find();
  }
});

Template.collectionPage.onCreated(function() {
  var self = this;

  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleCollection', id);
  });
});
