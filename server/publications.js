Meteor.publish('singleUser', function(username) {
  var options = {
    fields: {
      '_id': true,
      'username': true,
      'app': true,
      'services.twitter.profile_image_url': true,
      'services.twitter.profile_image_url_https': true,
      'services.twitter.screenName': true
    }
  }

  return Users.find({username: username}, options);
});

Meteor.publish("singleUserUpvoted", function(username){
  var user = Meteor.users.findOne({username: username});
  return Notes.find({"_id": {$in: user.app.upvotedNotes}});
});

Meteor.publish("singleUserSubmitted", function(username){
  var user = Meteor.users.findOne({username: username});
  return Notes.find({"userId": user._id});
});

Meteor.publish("singleUserCollections", function(username){
  var user = Meteor.users.findOne({username: username});
  return Collections.find({"userId": user._id});
});


Meteor.publish("singleTag", function(id){
  var collection = Collections.findOne(id);

  var collectionCursor = Collections.find(id);
  var notesCursor = Notes.find({"tagIds": collection._id})

  return [collectionCursor, notesCursor];
});

Meteor.publish("singleNote", function(id){
  var note = Notes.findOne(id);

  var noteCursor = Notes.find(id);
  var commentsCursor = Comments.find({"noteId": note._id})

  var users = [];
  if (note) {

    users.push(note.userId); // publish post author's ID

    // get IDs from all commenters on the post
    var comments = commentsCursor.fetch();
    if (comments.length) {
      users = users.concat(_.pluck(comments, "userId"));
    }

    // publish upvoters
    if (note.upvoters && note.upvoters.length) {
      users = users.concat(note.upvoters);
    }
  }

  // remove any duplicate IDs
  users = _.unique(users);

  var usersCursor = Meteor.users.find({_id: {$in: users}},
    {fields: {
      '_id': true,
      'username': true,
      'services.twitter.profile_image_url': true,
      'services.twitter.profile_image_url_https': true,
      'services.twitter.screenName': true
    }});

  return [noteCursor, commentsCursor, usersCursor];
});

Meteor.publish("topNotes", function(){
  var noteCursor = Notes.find();
  var notes = noteCursor.fetch();

  var tags = [];
  for (var note in notes) {
    tags = tags.concat(note.tagIds);
  }
  tags = _.unique(tags);
  var tagsCursor = Collections.find({_id: {$in: tags}},
    {fields: {
      '_id': true,
      'name': true,
      'type': true,
      'imgUrl': true
    }});

  return [noteCursor, tagsCursor];
});

// Collections, Classes, People

Meteor.publish("topCollections", function(){
  return Collections.find({type: 'collection'});
});

Meteor.publish("topClasses", function(){
  return Collections.find({type: 'class'});
});

Meteor.publish("topPeople", function(){
  return Collections.find({type: 'person'});
});

Meteor.publish("topTags", function(){
  return Collections.find({type: {$ne: 'collection'}});
});
