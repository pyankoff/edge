Notes = new Mongo.Collection('notes');

Notes.schema = new SimpleSchema({
  /**
    ID
  */
  _id: {
    type: String,
    optional: true
  },
  /**
    Text
  */
  text: {
    type: String,
    optional: false,
    max: 500
  },
  /**
    Timetstamp of post creation
  */
  createdAt: {
    type: Date,
    optional: true
  },
  /**
    Source URL
  */
  source: {
    type: String,
    optional: true,
    max: 500
  },
  /**
    An array containing the `_id`s of tags
  */
  tags: {
    type: [String],
    optional: true,
    autoform: {
          type: "selectize",
          options: function () {
                    var options = [];
                    Tags.find().forEach(function (element) {
                        options.push({
                            label: element.name, value: element._id
                        })
                    });
                    return options;
                },
          multiple: true,
          selectizeOptions: {}
        }
  },
  /**
    Slug
  */
  slug: {
    type: String,
    optional: true
  },
  /**
    Count of how many times the post's page was viewed
  */
  viewCount: {
    type: Number,
    optional: true
  },
  /**
    Count of the post's comments
  */
  commentCount: {
    type: Number,
    optional: true
  },
  /**
    An array containing the `_id`s of commenters
  */
  commenters: {
    type: [String],
    optional: true
  },
  /**
    Timestamp of the last comment
  */
  lastCommentedAt: {
    type: Date,
    optional: true
  },
  /**
    The post's base score (not factoring in the post's age)
  */
  baseScore: {
    type: Number,
    decimal: true,
    optional: true
  },
  /**
    How many upvotes the post has received
  */
  upvotes: {
    type: Number,
    optional: true
  },
  /**
    An array containing the `_id`s of the post's upvoters
  */
  upvoters: {
    type: [String],
    optional: true
  },
  /**
    The post's current score (factoring in age)
  */
  score: {
    type: Number,
    decimal: true,
    optional: true
  },
  /**
    The post author's name
  */
  author: {
    type: String,
    optional: true
  },
  /**
    The post author's `_id`. 
  */
  userId: {
    type: String,
    optional: true
  },
  /**
    How many collections use the note
  */
  collectionCount: {
    type: Number,
    optional: true
  },
  /**
    An array containing the `_id`s of collections including note
  */
  collections: {
    type: [String],
    optional: true
  },
  /**
    Whether the post is inactive. Inactive posts see their score recalculated less often
  */
  inactive: {
    type: Boolean,
    optional: true
  }
});

Notes.attachSchema(Notes.schema);



// Submit note

Notes.submit = function (note) {

  var userId = note.userId, // at this stage, a userId is expected
      user = Users.findOne(userId);

  // ------------------------------ Checks ------------------------------ //

  // check that a title was provided
  if(!note.text)
    throw new Meteor.Error(602, i18n.t('please_write_note_text'));

  // ------------------------------ Properties ----------------------------

  var defaultProperties = {
    createdAt: new Date(),
    author: Users.getDisplayNameById(userId),
    upvotes: 0,
    commentCount: 0,
    viewCount: 0,
    baseScore: 0,
    score: 0,
    inactive: false
  };

  note = _.extend(defaultProperties, note);

  note._id = Notes.insert(note);

  return note;
};


Meteor.methods({

  /**
   * Meteor method for submitting a note from the client
   * @memberof Notes
   * @param {Object} note - the note being inserted
   */
  submitNote: function(note){

    check(note, Notes.simpleSchema());

    // required properties:
    // title

    // optional properties
    // URL
    // body
    // categories
    // thumbnailUrl

    // NOTE: the current user and the note author user might be two different users!
    var user = Meteor.user(),
        hasAdminRights = user.isAdmin,
        schema = Notes.simpleSchema()._schema;

    // ------------------------------ Checks ------------------------------ //

    // check that user can note
    if (!user || !Users.can.post(user))
      throw new Meteor.Error(601, "You need to log in");

    // --------------------------- Rate Limiting -------------------------- //

    if(!hasAdminRights){

      var timeSinceLastNote = Users.timeSinceLast(user, Notes),
        numberOfNotesInPast24Hours = Users.numberOfItemsInPast24Hours(user, Notes),
        noteInterval = 30,
        maxNotesPer24Hours = 100;

      // check that user waits more than X seconds between Notes
      if(timeSinceLastNote < noteInterval)
        throw new Meteor.Error(604, i18n.t('please_wait')+(noteInterval-timeSinceLastNote)+i18n.t('seconds_before_posting_again'));

      // check that the user doesn't note more than Y Notes per day
      if(numberOfNotesInPast24Hours > maxNotesPer24Hours)
        throw new Meteor.Error(605, i18n.t('sorry_you_cannot_submit_more_than')+maxNotesPer24Hours+i18n.t('Notes_per_day'));

    }

    // if no userId has been set, default to current user id
    if (!note.userId) {
      note.userId = user._id;
    }

    return Notes.submit(note);
  }
});








