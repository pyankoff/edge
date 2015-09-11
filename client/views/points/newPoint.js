Template.addPoint.events({
  'submit #addPoint': function(e) {
    e.preventDefault();
    
    var text = e.target.pointText.value
    var noteId = FlowRouter.getParam('noteId');

    var note = Notes.findOne(noteId);
    if (note.userId != Meteor.userId()) {
      Meteor.call("fork", note, function (error, result) {
        if (error) {
          // handle error
        } else {
          Meteor.call("newPoint", text, result);
          FlowRouter.go("/note/:noteId", { noteId: result });
        }
      });
    } else {
      Meteor.call("newPoint", text, noteId);
    }

    e.target.pointText.value = "";
  }
});