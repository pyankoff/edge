Template.addToCollection.events({
  'click .collect': function(e) {
    Session.set('selectedNoteId', this._id);
  }
});