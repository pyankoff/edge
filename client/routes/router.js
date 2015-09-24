FlowRouter.route('/new', {
  action: function() {
    BlazeLayout.render("layout", {content: "newBit"});
  }
});

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("layout", {content: "home"});
  }
});

FlowRouter.route('/collections', {
  action: function() {
    BlazeLayout.render("layout", {content: "home"});
  }
});

FlowRouter.route('/collection/:id', {
  action: function() {
    BlazeLayout.render("layout", {content: "home"});
  }
});

FlowRouter.route('/note/:id', {
  action: function() {
    BlazeLayout.render("layout", {content: "note"});
  }
});