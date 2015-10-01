Template.home.helpers({
  notes: function () {
    FlowRouter.watchPathChange();
    var context = FlowRouter.current()
    console.log();

    switch(context.path) {
    case '/top':
        return notes = Notes.find({}, {sort: {upvotes: -1}});
    case '/new':
        return notes = Notes.find({}, {sort: {createdAt: -1}});
    default:
        return notes = Notes.find({}, {sort: {score: -1}});
    }
  }
});

Template.home.onCreated(function() {
  var self = this;

  self.autorun(function() {
    self.subscribe('topNotes');
  });
});
