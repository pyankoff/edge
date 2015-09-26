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








