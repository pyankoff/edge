FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("layout", {content: "home"});
  }
});

FlowRouter.route('/note/:id', {
  action: function() {
    BlazeLayout.render("layout", {content: "notePage"});
  }
});

FlowRouter.route('/new', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function() {
    BlazeLayout.render("layout", {content: "newNote"});
  }
});

FlowRouter.route('/newCollection', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function() {
    BlazeLayout.render("layout", {content: "newCollection"});
  }
});

// Classes, collections, people

FlowRouter.route('/classes', {
  action: function() {
    BlazeLayout.render("layout", {content: "classesList"});
  }
});

FlowRouter.route('/class/:id', {
  action: function() {
    BlazeLayout.render("layout", {
      header: 'classHeader',
      content: "collectionPage"
    });
  }
});

FlowRouter.route('/people', {
  action: function() {
    BlazeLayout.render("layout", {content: "peopleList"});
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
