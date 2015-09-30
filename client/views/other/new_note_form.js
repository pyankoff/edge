Template.noteForm.helpers({
  tag: function(){
    return FlowRouter.getQueryParam("tag")
  }
});

Template.noteForm.events({
  "focus #newNoteForm > textarea": function(e) {
    $(e.target).next('.extra-fields').show();
  },
  "blur #newNoteForm > textarea": function(e) {
    $(e.target).next('.extra-fields').hide();
  }
});

Template.newNoteForm.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('topTags');
  });
});
