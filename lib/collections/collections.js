Collections = new Mongo.Collection('collections');

Collections.schema = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  name: {
    type: String,
    optional: false,
    max: 500
  },
  createdAt: {
    type: Date,
    optional: true
  },
  type: {
    type: String,
    allowedValues: ['tag', 'person', 'class', 'collection'],
    optional: true
  },
  imgUrl: {
    type: String,
    optional: true
  },
  viewCount: {
    type: Number,
    optional: true
  },
  author: {
    type: String,
    optional: true
  },
  userId: {
    type: String,
    optional: true
  },
  noteCount: {
    type: Number,
    optional: true
  },
  notes: {
    type: [String],
    optional: true
  }
});

Collections.attachSchema(Collections.schema);
