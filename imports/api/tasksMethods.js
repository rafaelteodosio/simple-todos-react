import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.insert({
      text,
      name: text,
      situation: 'registered',
      createdAt: new Date,
      userId: this.userId,
    })
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.remove(taskId);
  },

  'task.getById'(taskId) {
    check(taskId, String);

    const _task = TasksCollection.findOne({ _id: taskId });
    if (!_task) {
      throw new Meteor.Error('task-not-found', 'Task not found');
    }
    return _task;
  },

  'tasks.update'(taskId, task) {
    check(taskId, String);
    check(task, Object);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const userTask = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!userTask) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.update(taskId, {
      $set: {
        ...task,
      },
    });
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  }
});