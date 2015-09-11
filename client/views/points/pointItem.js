Template.pointItem.helpers({
  pathForPoint: function() {
    var bestNote = Notes.findOne({_id: {$in: this.notes}},
                                {$orderby:{lights: -1}});

    var path = FlowRouter.path("/note/:noteId", 
        { noteId: bestNote._id });

    return path;
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.lighters, userId)) {
      return 'lightable';
    } else {
      return 'disabled';
    }
  }
});

Template.pointItem.events({
  'click .lightable': function(e) {
    e.preventDefault();
    Meteor.call('light', this._id);
  },
  'click .note': function(e) {
    e.preventDefault();
    Session.set("selectedPoint", this._id);
    FlowRouter.setQueryParams({action: "addToNote"});
  }
});