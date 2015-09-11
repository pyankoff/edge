Points = new Mongo.Collection('points');

Meteor.methods({
  light: function(pointId) {
    check(this.userId, String);
    check(pointId, String);
    
    var affected = Points.update({
      _id: pointId, 
      lighters: {$ne: this.userId}
    }, {
      $addToSet: {lighters: this.userId},
      $inc: {votes: 1}
    });
    
    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  },
  newPoint: function(text, noteId) {
    var point = {
      text: text,
      userId: this.userId,
      notes: [noteId]
    };

    var pointId = Points.insert(point);

    Notes.update({
      _id: noteId
    }, {
      $addToSet: {points: pointId}
    });

    return pointId;
  },
  addToNote: function(pointId, noteId) {
    check(pointId, String);
    check(noteId, String);

    Points.update({
      _id: pointId
    }, {
      $addToSet: {notes: noteId},
    });
  }
});





