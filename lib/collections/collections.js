Collections = new Mongo.Collection('collections');

App.schemas.tagIdsAutoform = {
      type: "selectize",
      placeholder: 'Tags',
      options: function () {
                var options = [];
                Collections.find({type: {$ne: 'collection'}}).forEach(function (element) {
                    options.push({
                        label: element.name,
                        value: element._id
                    })
                });
                return options;
            },
      multiple: true,
      selectizeOptions: {
        create: function(input) {
            var newTag = Collections.insert({
              name: input,
              type: 'tag',
              userId: Meteor.userId(),
              notes: []
            });
            return {
              value: newTag,
              text: input
            }
        }
      }
    }

Collections.schema = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  name: {
    type: String,
    autoform: {
        placeholder: 'Collection name...'
    },
    optional: true,
    max: 500
  },
  tagIds: {
    type: [String],
    optional: true,
    autoform: App.schemas.tagIdsAutoform
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


Meteor.methods({
  collectionSubmit: function(collection){
    console.log(collection);
    var defaultValues = {
      type: 'collection',
      userId: Meteor.userId(),
      createdAt: new Date(),
      author: Users.getDisplayNameById(Meteor.userId()),
      notes: []
    }

    collection = _.extend(defaultValues, collection);

    collection._id = Collections.insert(collection);

    return collection;
  }
});
