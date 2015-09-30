Template.collectPopover.helpers({
  collections: function () {
    return Collections.find({userId: Meteor.userId()});
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

    Meteor.call("collectionSubmit",{
      name: e.target.collectionName.value
    });

    Session.set('addNewCollection', false);
  },
  'click .collection-label': function(e) {
    e.preventDefault();

    var selectedNoteId = Session.get('selectedNoteId');

    Collections.update({_id: this._id},
    {
      $addToSet: {notes: selectedNoteId},
      $inc: {noteCount: 1}
    })

    Session.set('collectSuccess', {
      name: this.name,
      _id: this._id
    });
  }
});

Template.collectPopover.destroyed = function () {
  Session.set('addNewCollection', null);
  Session.set('collectSuccess', null);
};

Template.collectPopover.onCreated(function() {
  var self = this;

  self.autorun(function() {
    self.subscribe('singleUserCollections', Meteor.user().username);
  });
});
