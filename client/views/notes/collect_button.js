Template.addToCollection.events({
  'click .collect': function(e) {
    Session.set('selectedNoteId', this._id);
  }
});

Template.addToCollection.onCreated(function() {
  var self = this;

  self.autorun(function() {
    self.subscribe('collections');
  });
});
