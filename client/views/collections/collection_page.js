Template.collectionPage.helpers({
  notes: function () {
    var id = FlowRouter.getParam('id');
    var collection = Collections.findOne(id);

    return Notes.find({"_id": {$in: collection.notes}});
  }
});

Template.collectionPage.onCreated(function() {
  var self = this;

  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleCollection', id);
  });
});
