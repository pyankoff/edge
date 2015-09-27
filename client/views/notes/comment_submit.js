AutoForm.hooks({
  submitCommentForm: {

    before: {
      method: function(comment) {
        this.template.$('button[type=submit]').addClass('loading');
        var parent = this.template.data.parentContext;

        if (Match.test(parent, Comments.schema)) { // child comment
          comment.parentCommentId = parent._id;
          comment.noteId = parent.noteId;

          if(!parent.topLevelCommentId) { // root comment
            comment.topLevelCommentId = parent._id;
          } else { // nested comment
            comment.topLevelCommentId = parent.topLevelCommentId;
          }
        } else { // root comment
          comment.noteId = parent._id;
        }

        // ------------------------------ Checks ------------------------------ //

        if (!Meteor.user()) {
          Messages.flash(i18n.t('you_must_be_logged_in'), 'error');
          return false;
        }

        return comment;
      }
    },

    onSuccess: function(operation, comment) {
      this.template.$('button[type=submit]').removeClass('loading');
      Session.set("replyTo", null);
    },

    onError: function(operation, error) {
      this.template.$('button[type=submit]').removeClass('loading');
      Messages.flash(error.message.split('|')[0], 'error'); // workaround because error.details returns undefined
      Messages.clearSeen();
    }
  }
});
