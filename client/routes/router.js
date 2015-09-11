FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("layout", {content: "pointList"});
  }
});

FlowRouter.route('/note/:noteId', {
  action: function() {
    BlazeLayout.render("layout", {content: "pointList"});
  }
});

FlowRouter.route('/point/:pointId', {
  action: function() {
    BlazeLayout.render("layout", {content: "pointPage"});
  }
});