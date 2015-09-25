Template.addToCollection.helpers({
  collections: function () {
    return Collections.find();
  },
  addNew: function () {
    return Session.get('addNewCollection');
  }
});

Template.addToCollection.events({
  'click .collect': function(e) {
    Session.set('selectedNoteId', this._id);
  },
  'click .add-new-collection': function (e) {
    e.preventDefault();

    Session.set('addNewCollection', true);
  },
  'submit .create-collection': function(e) {
    e.preventDefault();

    Collections.insert({
      name: e.target.collectionName.value,
      notes: []
    });

    Session.set('addNewCollection', false);
  },
  'click .collection-label': function(e) {
    var selectedNoteId = Session.get('selectedNoteId');

    Collections.update({_id: this._id},
    {
      $addToSet: {notes: selectedNoteId}
    })
  }
});