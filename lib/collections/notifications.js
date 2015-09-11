Notifications = new Mongo.Collection('notifications');

createNotification = function(oldUserId, noteId, forker) {
  Notifications.insert({
    userId: oldUserId,
    noteId: noteId,
    forker: forker,
    read: false
  });
};