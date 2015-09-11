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
  newPoint: function(point) {
    check(this.userId, String);

    point.userId = this.userId

    var pointId = Points.insert(point);

    return pointId;
  }
});