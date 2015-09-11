Template.notePage.helpers({
  note: function() {
    var noteId = FlowRouter.getParam('noteId');
    
    var note = Notes.findOne({_id: noteId}) || {};
    
    return note;
  },
  points: function() {
    var noteId = FlowRouter.getParam('noteId');
    
    var note = Notes.findOne({_id: noteId}) || {};

    var points = Points.find({_id: {$in: note.points}}) || {};
    
    return points;
  }
});