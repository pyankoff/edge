FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("layout", {content: "home"});
  }
});

FlowRouter.route('/collections', {
  action: function() {
    BlazeLayout.render("layout", {content: "collectionList"});
  }
});

FlowRouter.route('/collection/:id', {
  action: function() {
    BlazeLayout.render("layout", {
      header: 'collectionHeader',
      content: "collectionPage"
    });
  }
});

FlowRouter.route('/note/:id', {
  action: function() {
    BlazeLayout.render("layout", {content: "notePage"});
  }
});

FlowRouter.route('/new', {
  action: function() {
    BlazeLayout.render("layout", {content: "newBit"});
  }
});

FlowRouter.route('/tags', {
  action: function() {
    BlazeLayout.render("layout", {content: "tags"});
  }
});

FlowRouter.route('/tag/:id', {
  action: function() {
    BlazeLayout.render("layout", {content: "tagPage"});
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
