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

Meteor.publish('postUsers', function(postId) {

  check(postId, String);

  if (Users.can.viewById(this.userId)){
    // publish post author and post commenters
    var post = Posts.findOne(postId);
    var users = [];

    if (post) {

      users.push(post.userId); // publish post author's ID

      // get IDs from all commenters on the post
      var comments = Comments.find({postId: post._id}).fetch();
      if (comments.length) {
        users = users.concat(_.pluck(comments, "userId"));
      }

      // publish upvoters
      if (post.upvoters && post.upvoters.length) {
        users = users.concat(post.upvoters);
      }

      // publish downvoters
      if (post.downvoters && post.downvoters.length) {
        users = users.concat(post.downvoters);
      }

    }

    // remove any duplicate IDs
    users = _.unique(users);

    return Meteor.users.find({_id: {$in: users}}, {fields: Users.pubsub.publicProperties});
  }
  return [];
});



Meteor.publish("topNotes", function(){
  return Notes.find();
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
