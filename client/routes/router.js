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