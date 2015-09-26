Template.collectPopover.helpers({
  collections: function () {
    return Collections.find();
  },
  addNew: function () {
    return Session.get('addNewCollection');
  },
  collectSuccess: function () {
    return Session.get('collectSuccess');
  }
});

Template.collectPopover.events({
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
    e.preventDefault();

    var selectedNoteId = Session.get('selectedNoteId');

    Collections.update({_id: this._id},
    {
      $addToSet: {notes: selectedNoteId}
    })

    Session.set('collectSuccess', this.name);
  }
});

Template.collectPopover.destroyed = function () {
  Session.set('addNewCollection', null);
  Session.set('collectSuccess', null);
};
