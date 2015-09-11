Template.notesList.helpers({
  notes: function() {
    return Notes.find({ userId: Meteor.userId() });
  }
});