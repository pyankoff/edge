Users = Meteor.users;

App.schemas.userData = new SimpleSchema({
  noteCount: {
    type: Number,
    optional: true
  },
  commentCount: {
    type: Number,
    optional: true
  },
  upvotedNotes: {
    type: [String],
    optional: true
  },
  upvotedComments: {
    type: [String],
    optional: true
  }
})

Users.schema = new SimpleSchema({ 
  _id: {
    type: String,
    optional: true
  },
  username: {
    type: String,
    optional: true
  },
  emails: {
    type: [Object],
    optional: true
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true
  },
  "emails.$.verified": {
    type: Boolean,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
      type: Object,
      optional: true,
      blackbox: true
  },
  isAdmin: {
    type: Boolean,
    optional: true,
    autoform: {
      omit: true
    }
  },
  app: {
    type: App.schemas.userData,
    optional: true
  }
});

/**
 * Attach schema to Meteor.users collection
 */
Users.attachSchema(Users.schema);



// helpers

Users.hasUpvoted = function (user, post) {
  return user && _.include(post.upvoters, user._id);
};
Users.helpers({
  hasUpvoted: function (post) {
    return Users.hasUpvoted(this, post);
  }
});



// permissions

Users.can = {};

Users.can.post = function (user, returnError) {
  user = (typeof user === 'undefined') ? Meteor.user() : user;

  if (!user) {
    return returnError ? "no_account" : false;
  } else {
    return true;
  }
};

Users.can.comment = function (user, returnError) {
  return Users.can.post(user, returnError);
};

Users.can.vote = function (user, returnError) {
  return Users.can.post(user, returnError);
};
