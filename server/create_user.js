Accounts.onCreateUser(function(options, user){
  user = setupUser(user, options);

  return user;
});

function setupUser (user, options) {
  var userProperties = {
    profile: {},
    app: {
      noteCount: 0,
      commentCount: 0,
      upvotedNotes: [],
      upvotedComments: []
    },
    isAdmin: false
  };
  user = _.extend(user, userProperties);

  if (user.services.twitter != undefined) {
    user.username = user.services.twitter.screenName;
  } else {
    user.email_hash = Avatar.hash(user.emails[0].address);
  }

  // // create slug from display name
  // user.app.slug = Telescope.utils.slugify(user.telescope.displayName);

  // Events.track('new user', {username: user.username, email: user.profile.email});

  return user;
}
