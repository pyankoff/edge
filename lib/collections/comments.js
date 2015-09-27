Comments = new Mongo.Collection('comments');

Comments.schema = new SimpleSchema({
  /**
    ID
  */
  _id: {
    type: String,
    optional: true
  },
  /**
    The `_id` of the parent comment, if there is one
  */
  parentCommentId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    optional: true,
    autoform: {
      omit: true // never show this
    }
  },
  /**
    The `_id` of the top-level parent comment, if there is one
  */
  topLevelCommentId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    optional: true,
    autoform: {
      omit: true // never show this
    }
  },
  /**
    The timestamp of comment creation
  */
  createdAt: {
    type: Date,
    optional: true
  },
  /**
    The comment body (Markdown)
  */
  body: {
    type: String,
    max: 3000,
    autoform: {
      rows: 5,
      afFormGroup: {
        'formgroup-class': 'hide-label'
      }
    }
  },
  /**
    The comment's base score (doesn't factor in comment age)
  */
  baseScore: {
    type: Number,
    decimal: true,
    optional: true
  },
  /**
    The comment's current score (factors in comment age)
  */
  score: {
    type: Number,
    decimal: true,
    optional: true
  },
  /**
    The number of upvotes the comment has received
  */
  upvotes: {
    type: Number,
    optional: true
  },
  /**
    An array containing the `_id`s of upvoters
  */
  upvoters: {
    type: [String],
    optional: true
  },
  /**
    The comment author's name
  */
  author: {
    type: String,
    optional: true
  },
  /**
    Whether the comment is inactive. Inactive comments' scores gets recalculated less often
  */
  inactive: {
    type: Boolean,
    optional: true
  },
  /**
    The note's `_id`
  */
  noteId: {
    type: String,
    optional: true,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    autoform: {
      omit: true // never show this
    }
  },
  /**
    The comment author's `_id`
  */
  userId: {
    type: String,
    optional: true
  }
});

Comments.attachSchema(Comments.schema);



Comments.submit = function (comment) {
  var userId = comment.userId; // at this stage, a userId is expected

  // ------------------------------ Checks ------------------------------ //

  // Don't allow empty comments
  if (!comment.body)
    throw new Meteor.Error(704,i18n.t('your_comment_is_empty'));

  // ------------------------------ Properties ------------------------------ //

  var defaultProperties = {
    createdAt: new Date(),
    upvotes: 0,
    baseScore: 0,
    score: 0,
    author: Users.getDisplayNameById(userId)
  };

  comment = _.extend(defaultProperties, comment);

  comment._id = Comments.insert(comment);

  return comment;
};

Comments.edit = function (commentId, modifier, comment) {
  Comments.update(commentId, modifier);

  return Comments.findOne(commentId);
};


Meteor.methods({
  submitComment: function(comment){
    var user = Meteor.user(),
        schema = Comments.simpleSchema()._schema;

    // ------------------------------ Checks ------------------------------ //

    // check that user can comment
    if (!user || !Users.can.comment(user))
      throw new Meteor.Error(i18n.t('you_need_to_login_or_be_invited_to_post_new_comments'));

    // ------------------------------ Rate Limiting ------------------------------ //

    if (!user.isAdmin) {

      var timeSinceLastComment = Users.timeSinceLast(user, Comments),
          commentInterval = 1;

      // check that user waits more than 15 seconds between comments
      if((timeSinceLastComment < commentInterval))
        throw new Meteor.Error(704, i18n.t('please_wait')+(commentInterval-timeSinceLastComment)+i18n.t('seconds_before_commenting_again'));

    }

    // if no userId has been set, default to current user id
    if (!comment.userId) {
      comment.userId = user._id;
    }

    return Comments.submit(comment);
  },

  // editComment: function (modifier, commentId) {
  //
  //   // checking might be redundant because SimpleSchema already enforces the schema, but you never know
  //   check(modifier, {$set: Comments.simpleSchema()});
  //   check(commentId, String);
  //
  //   var user = Meteor.user(),
  //       comment = Comments.findOne(commentId),
  //       schema = Comments.simpleSchema()._schema;
  //
  //   // ------------------------------ Checks ------------------------------ //
  //
  //   // check that user can edit
  //   if (!user || !Users.can.edit(user, comment)) {
  //     throw new Meteor.Error(601, i18n.t('sorry_you_cannot_edit_this_comment'));
  //   }
  //
  //   // go over each field and throw an error if it's not editable
  //   // loop over each operation ($set, $unset, etc.)
  //   _.each(modifier, function (operation) {
  //     // loop over each property being operated on
  //     _.keys(operation).forEach(function (fieldName) {
  //
  //       var field = schema[fieldName];
  //       if (!Users.can.editField(user, field, comment)) {
  //         throw new Meteor.Error("disallowed_property", i18n.t('disallowed_property_detected') + ": " + fieldName);
  //       }
  //
  //     });
  //   });
  //
  //   Comments.edit(commentId, modifier, comment);
  // },
  //
  // deleteCommentById: function (commentId) {
  //
  //   check(commentId, String);
  //
  //   var comment = Comments.findOne(commentId);
  //   var user = Meteor.user();
  //
  //   if(Users.can.edit(user, comment)){
  //
  //     // decrement post comment count and remove user ID from post
  //     Posts.update(comment.postId, {
  //       $inc:   {commentCount: -1},
  //       $pull:  {commenters: comment.userId}
  //     });
  //
  //     // decrement user comment count and remove comment ID from user
  //     Meteor.users.update({_id: comment.userId}, {
  //       $inc:   {'telescope.commentCount': -1}
  //     });
  //
  //     // note: should we also decrease user's comment karma ?
  //     // We don't actually delete the comment to avoid losing all child comments.
  //     // Instead, we give it a special flag
  //     Comments.update({_id: commentId}, {$set: {
  //       body: 'Deleted',
  //       htmlBody: 'Deleted',
  //       isDeleted: true
  //     }});
  //
  //   }else{
  //
  //     Messages.flash("You don't have permission to delete this comment.", "error");
  //
  //   }
  // }
});
