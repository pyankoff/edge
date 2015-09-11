Template.pointItem.helpers({
  pathForPoint: function() {
    var params = {
        pointId: this._id
    };

    var path = FlowRouter.path("point/:pointId", params);

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
    FlowRouter.setQueryParams({action: "addToNote"});
  }
});