Template.newNote.helpers({
  tag: function(){
    return FlowRouter.getQueryParam("tag")
  }
});

Template.newNote.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('topTags');
  });
});
