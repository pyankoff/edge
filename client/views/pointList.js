Template.pointList.helpers({
  points: function() {
    var noteId = FlowRouter.getParam('noteId');
    var points = Points.find({noteId: noteId}) || Points.find();
    
    return points;
  }
});