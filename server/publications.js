Meteor.publish('singleUser', function(username) {
  var options = {
    fields: {
      emails: 0,
      createdAt: 0,
      isAdmin: 0,
      services: 0
    }
  }

  return Users.find(user._id, options);;
});

Meteor.publish("singleUserUpvotes", function(username){
  var user = Meteor.users.findOne({username: username});
  return Notes.find({"_id": {$in: user.app.upvotedNotes}});
});

Meteor.publish("singleUserSubmitted", function(username){
  var user = Meteor.users.findOne({username: username});
  return Notes.find({"userId": user._id});
});

// Meteor.publish("notes", function(){
//   return Notes.find();
// });

Meteor.publish("collections", function(){
  return Collections.find();
});

Meteor.publish("tags", function(){
  return Tags.find();
});
