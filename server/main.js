import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/db/TasksCollection';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { check } from 'meteor/check';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';
import '/imports/api/fileMethods';
import '/imports/api/filePublications';

Meteor.methods({
  'user.create'(userData) {
    check(userData, Object);
    if (!userData) {
      throw new Meteor.Error('Error on create user.');
    }
    if (Accounts.findUserByUsername(userData?.username)) {
      throw new Meteor.Error('Username already in use.');
    }
    const userId = Accounts.createUser({
      username: userData?.username,
      password: userData?.password,
      email: userData?.email,
      profile: {
        name: userData?.name,
        date: userData?.date,
        gender: userData?.gender
      }
    });
    return userId;
  },
});

Meteor.methods({
  'user.update'(userId, userData) {
    check(userData, Object);
    if (!userData) {
      throw new Meteor.Error('Error on update user.');
    }
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    Meteor.users.update({ _id: userId }, { $set: { profile: { ...userData } } });
  },
});

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(taskText => insertTask(taskText, user));
  }
});

ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: 'bd6ab354f36aa8e216b9',
      secret: 'c86c27fadac5681d8bd933ab657945799b763a6f',
    },
  }
);