Template.noteForm.helpers({
  tag: function(){
    return FlowRouter.getQueryParam("tag")
  }
});

Template.noteForm.events({
  "focus .noteForm": function(e) {
    $('.extra-fields').hide();
    $(e.target).next('.extra-fields').show();
    $(e.target).parents('.extra-fields').show();
  }
});

Template.noteForm.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('topTags');
  });
});
