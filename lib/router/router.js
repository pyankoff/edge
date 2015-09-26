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
    BlazeLayout.render("layout", {content: "collectionPage"});
  }
});

FlowRouter.route('/note/:id', {
  action: function() {
    BlazeLayout.render("layout", {content: "note"});
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


//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');