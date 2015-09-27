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

Meteor.publish("singleUserSubmitted", function(username){
  var user = Meteor.users.findOne({username: username});
  return Notes.find({"userId": user._id});
});

Meteor.publish("singleUserCollections", function(username){
  var user = Meteor.users.findOne({username: username});
  return Collections.find({"userId": user._id});
});


Meteor.publish("singleCollection", function(id){
  var collection = Collections.findOne(id);

  var collectionCursor = Collections.find(id);
  var notesCursor = Notes.find({"_id": {$in: collection.notes}})

  return [collectionCursor, notesCursor];
});

Meteor.publish("singleNote", function(id){
  var note = Notes.findOne(id);

  var noteCursor = Notes.find(id);
  var commentsCursor = Comments.find({"noteId": note._id})

  return [noteCursor, commentsCursor];
});

Meteor.publish("topNotes", function(){
  return Notes.find();
});

Meteor.publish("topCollections", function(){
  return Collections.find({type: 'collection'});
});

Meteor.publish("topTags", function(){
  return Collections.find({type: {$ne: 'collection'}});
});
