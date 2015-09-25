Template.newComment.events({
  'submit .new-comment': function (e) {
    e.preventDefault();

    var text = e.target.text.value;

    Comments.insert({
      text: text,
      note: this._id
    });

    e.target.reset();
  }
});