Template.addToCollection.helpers({
  collections: function () {
    return Collections.find();
  },
  addNew: function () {
    return Session.get('addNewCollection');
  }
});

Template.addToCollection.events({
  'click .add-new-collection': function (e) {
    e.preventDefault();

    Session.set('addNewCollection', true);
  },
  'submit .create-collection': function(e) {
    e.preventDefault();

    Collections.insert({
      name: e.target.collectionName.value
    });

    Session.set('addNewCollection', false);
  }
});