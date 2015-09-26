Meteor.publish('singleUser', function(username) {
  var options = {
    fields: {
      emails: 0,
      createdAt: 0,
      isAdmin: 0,
      services: 0
    }
  }

  var user = Meteor.users.findOne({username: username});

  var userCursor = Users.find(user._id, options);
  var notesCursor = Notes.find({"_id": {$in: user.app.upvotedNotes}});

  return [userCursor, notesCursor];
});

Meteor.publish("notes", function(){
  return Notes.find();
});

Meteor.publish("collections", function(){
  return Collections.find();
});

Meteor.publish("tags", function(){
  return Tags.find();
});
