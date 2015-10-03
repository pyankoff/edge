FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("layout", {content: "home"});
  }
});

FlowRouter.route('/new', {
  action: function() {
    BlazeLayout.render("layout", {content: "home"});
  }
});

FlowRouter.route('/top', {
  action: function() {
    BlazeLayout.render("layout", {content: "home"});
  }
});

FlowRouter.route('/note/:id', {
  action: function() {
    BlazeLayout.render("layout", {content: "notePage"});
  }
});

FlowRouter.route('/new-note', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function() {
    BlazeLayout.render("layout", {content: "newNote"});
  }
});

// Tags, collections

FlowRouter.route('/tag/:id', {
  action: function() {
    BlazeLayout.render("layout", {
      header: 'tagHeader',
      content: "collectionPage"
    });
  }
});

FlowRouter.route('/person/:id', {
  action: function() {
    BlazeLayout.render("layout", {
      header: 'personHeader',
      content: "collectionPage"
    });
  }
});

// Profile routes
var profileRoutes = FlowRouter.group({
  prefix: '/@:username'
});


profileRoutes.route('/', {
  name: 'profile',
  action: function() {
    BlazeLayout.render("layout", {
      header: "profileHeader",
      content: "profileUpvoted"
    });
  }
});

profileRoutes.route('/:tab', {
  action: function(params) {
    var routeName = "profile" + params.tab.charAt(0).toUpperCase() + params.tab.slice(1)
    BlazeLayout.render("layout", {
      header: "profileHeader",
      content: routeName
    });
  }
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
