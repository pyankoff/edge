Template.comment.helpers({
  profilePath: function(){
    var username = this.author;

    return FlowRouter.path("profile", {username: username});
  },
  replyToThis: function() {
    var replyId = Session.get('replyTo');
    return replyId && replyId == this._id;
  },
  replies: function() {
    return Comments.find({topLevelCommentId: this._id});
  },
  imageLink: function() {
    return this.imgUrl ? this.imgUrl : "http://placehold.it/30x30";
  }
});

Template.comment.events({
  "click .btn-reply": function(event, template){
    Session.set("replyTo", this._id);
  }
});
