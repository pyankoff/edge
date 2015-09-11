Template.addToNote.helpers({
  notes: function() {
    return Notes.find({}, {author: Meteor.userId});
  }
});

Template.addToNote.events({
  'click .noteSelect': function(e) {
    e.preventDefault();

    pointId = Session.get("selectedPoint");;
    noteId = this._id;

    Meteor.call("addToNote", pointId, noteId);

    $('#addToNote').modal("hide");
    FlowRouter.go("/note/:noteId", { noteId: this._id });
  }
});