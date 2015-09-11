FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("layout", {content: "pointsList"});
  }
});

FlowRouter.route('/note/:noteId', {
  action: function() {
    BlazeLayout.render("layout", {content: "notePage"});
  }
});

FlowRouter.route('/notes', {
  action: function() {
    BlazeLayout.render("layout", {content: "notesList"});
  }
});

FlowRouter.route('/point/:pointId', {
  action: function() {
    BlazeLayout.render("layout", {content: "pointPage"});
  }
});