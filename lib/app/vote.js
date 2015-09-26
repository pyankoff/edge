// ------------------------------- Vote Power -------------------------------- //

// The equation to determine voting power
// Default to returning 1 for everybody

var getVotePower = function (user) {
  return 1;
};

var hasUpvotedItem = function (item, user) {
  return item.upvoters && item.upvoters.indexOf(user._id) !== -1;
};

var addVote = function (userId, itemId, collection) {
  var field = 'app.upvoted' + collection;
  var add = {};
  add[field] = itemId;

  Meteor.users.update({_id: userId}, {
    $addToSet: add
  });
};

var removeVote = function (userId, itemId, collection) {
  var field = 'app.upvoted' + collection;
  var remove = {};
  remove[field] = itemId;

  Meteor.users.update({_id: userId}, {
    $pull: remove
  });
};


App.upvoteItem = function (collection, itemId) {

  user = Meteor.user();
  var collectionName = collection._name.slice(0,1).toUpperCase()+collection._name.slice(1);
  var item = collection.findOne(itemId);

  // make sure user has rights to upvote first
  if (!user || !Users.can.vote(user, true) || hasUpvotedItem(item, user))
    return false;

  var votePower = getVotePower(user);

  // Votes & Score
  var result = collection.update({_id: item && item._id, upvoters: { $ne: user._id }},{
    $addToSet: {upvoters: user._id},
    $inc: {upvotes: 1, baseScore: votePower},
    $set: {inactive: false}
  });

  if (result > 0) {
    addVote(user._id, item._id, collectionName);

    // extend item with baseScore to help calculate newScore
    item = _.extend(item, {baseScore: (item.baseScore + votePower)});
    App.updateScore({collection: collection, item: item, forceUpdate: true});
  }
  // console.log(collection.findOne(item._id));
  return true;
};

App.cancelUpvote = function (collection, itemId) {

  user = Meteor.user();
  var collectionName = collection._name.slice(0,1).toUpperCase()+collection._name.slice(1);
  var item = collection.findOne(itemId);

  // if user isn't among the upvoters, abort
  if (!hasUpvotedItem(item, user))
    return false;

  var votePower = getVotePower(user);

  // Votes & Score
  var result = collection.update({_id: item && item._id, upvoters: user._id},{
    $pull: {upvoters: user._id},
    $inc: {upvotes: -1, baseScore: -votePower},
    $set: {inactive: false}
  });

  if (result > 0) {
    // Remove item from list of upvoted items
    removeVote(user._id, item._id, collectionName);

    // extend item with baseScore to help calculate newScore
    item = _.extend(item, {baseScore: (item.baseScore - votePower)});
    App.updateScore({collection: collection, item: item, forceUpdate: true});
  }
  // console.log(collection.findOne(item._id));
  return true;
};


Meteor.methods({
  upvoteNote: function (noteId) {
    check(noteId, String);
    return App.upvoteItem.call(this, Notes, noteId);
  },
  cancelUpvoteNote: function (noteId) {
    check(noteId, String);
    return App.cancelUpvote.call(this, Notes, noteId);
  },
  upvoteComment: function (commentId) {
    check(commentId, String);
    return App.upvoteItem.call(this, Comments, commentId);
  },
  cancelUpvoteComment: function (commentId) {
    check(commentId, String);
    return App.cancelUpvote.call(this, Comments, commentId);
  }
});