Template.collectionPage.helpers({
  notes: function () {
    var currentPath = FlowRouter.current();
    var collection = Collections.findOne(currentPath.params.id);

    var notes = Notes.find({
      _id: {
        $in: collection.notes
      }
    });

    return notes;
  }
});

Template.collectionPage.onCreated(function() {
  var self = this;

  self.autorun(function() {
    self.subscribe('collections');
  });
});
