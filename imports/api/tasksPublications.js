import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.publish('tasks', function publishTasks() {
  if (!this.userId) {
    return this.ready();
  }
  return TasksCollection.find({
    $or: [
      {
        isPersonal: { $ne: true },
      },
      {
        isPersonal: true,
        userId: this.userId,
      }
    ]
  });
});