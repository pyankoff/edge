Template.nav.events({
  'click #newNoteButton': function(e) {
    e.preventDefault();
    FlowRouter.setQueryParams({action: "newNote"});
  }
});