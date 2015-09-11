Template.nav.events({
  'click #newNoteButton': function(e) {
    e.preventDefault();
    FlowRouter.setQueryParams({action: "newNote"});
  }
});

Template.nav.helpers({
  pathForNotes: function() {
    return FlowRouter.path("/notes");
  }
});