Template.notesList.helpers({
  notes: function() {
    return Notes.find({ userId: Meteor.userId() });
  }
});

Template.notesList.events({
  'click .newNoteButton': function(e) {
    e.preventDefault();
    FlowRouter.setQueryParams({action: "newNote"});
  }
});