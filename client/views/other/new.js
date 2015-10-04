Template.newNote.helpers({
  tag: function(){
    return FlowRouter.getQueryParam("tag")
  }
});

Template.newNote.onCreated(function() {
  var self = this;

  AutoForm.addHooks('newNoteForm', {
    after: {
      method: function (error, result) {
        analytics.track("note submitted", {'_id': result._id});
        FlowRouter.go('/note/:id', {id: result._id});
      }
    }
  })

  self.autorun(function() {
    self.subscribe('topTags');
  });
});
