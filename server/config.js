Meteor.startup(function () {
  Accounts.loginServiceConfiguration.remove({
    service: "twitter"
  });
  Accounts.loginServiceConfiguration.insert({
    service: "twitter",
    consumerKey: Meteor.settings.twitterConsumerKey,
    secret: Meteor.settings.twitterSecret
  });
});
