Template.noteForm.helpers({
  tag: function(){
    return FlowRouter.getQueryParam("tag")
  }
});

Template.noteForm.events({
  "focus .noteForm": function(e) {
    $(e.target).next('.extra-fields').show();
    $(e.target).parents('.extra-fields').show();
  },
  "blur .noteForm": function(e) {
    $('.extra-fields').hide();
  }
});

Template.noteForm.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('topTags');
  });
});
