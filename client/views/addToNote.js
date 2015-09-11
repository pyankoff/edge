Template.addToNote.helpers({
  notes: function() {
    return Notes.find({}, {author: Meteor.userId});
  }
});

Template.addToNote.events({
  'click .noteSelect': function(e) {
    e.preventDefault();

    $('#addToNote').modal("hide");
    FlowRouter.go("/note/:noteId", { noteId: this._id });
  }
});