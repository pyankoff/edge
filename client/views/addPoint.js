Template.addPoint.events({
  'submit #addPoint': function(e) {
    e.preventDefault();
    
    var text = e.target.pointText.value
    var noteId = FlowRouter.getParam('noteId');

    var point = {
      text: text,
      noteId: noteId
    }

    Meteor.call("newPoint", point, function (error, result) {
      if (error) {
        // handle error
      } else {
        // examine result
        console.log(result);
      }
    });

    e.target.pointText.value = "";
  }
});