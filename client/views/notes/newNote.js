Template.newNote.events({
  'submit #addNote': function(e) {
    e.preventDefault();
    
    var noteName = e.target.noteName.value

    Meteor.call("newNote", noteName, function (error, result) {
      if (error) {
        // handle error
      } else {
        // examine result
        $('#newNote').modal("hide");
        FlowRouter.go("/note/:noteId", 
          { noteId: result });
      }
    });

    e.target.noteName.value = "";
  }
});