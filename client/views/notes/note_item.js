Template.noteItem.helpers({
  noteLink: function() {
    return FlowRouter.path("/note/:id", {id: this._id});
  },
  actionClass: function () {
    var user = Meteor.user();
    var actionClass = "";

    if(!user) return false;

    if (user.hasUpvoted(this)) {
      actionClass += " upvoted";
    }

    return actionClass;
  },
  linkForTag: function () {
    return FlowRouter.path("/"+this.type+"/:id", {id: this._id});
  },
  imgLink: function () {
    if (this.persona != undefined) {
      return FlowRouter.path("/"+this.persona.type+"/:id", {id: this.persona._id});
    }
  },
  editLink: function () {
    return FlowRouter.path("/note/:id/edit", {id: this._id});
  },
  canEdit: function () {
    return this.userId == Meteor.userId();
  }
});

Template.noteItem.events({
  'click .btn-upvote': function(e){
    e.preventDefault();
    e.stopPropagation();

    var note = this;
    var user = Meteor.user();

    if(!user){
      FlowRouter.go('atSignIn');
      // Messages.flash(i18n.t("please_log_in_first"), "info");
    }
    if (user.hasUpvoted(note)) {
      Meteor.call('cancelUpvoteNote', note._id, function(){
        analytics.track("note upvote cancelled", {'_id': note._id});
      });
    } else {
      Meteor.call('upvoteNote', note._id, function(){
        analytics.track("note upvoted", {'_id': note._id});
      });
    }
  },
  'click .fa-globe, .item-thumbnail, .btn': function (e) {
    e.stopPropagation();
  },
  'click .note-item': function (e) {
    if (!$(e.target).is('.btn') &&
        !$(e.target).is('img') &&
        !$(e.target).is('a')) {
      e.preventDefault();
      FlowRouter.go("/note/:id", {id: this._id});
    }
  }
});
