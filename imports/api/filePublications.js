import { Meteor } from 'meteor/meteor';
import { ImagesCollection } from '../db/FilesCollection';

Meteor.publish('images.user', function publishFile() {
  if (this.userId) {
    return ImagesCollection.find({ _userId: this.userId });
  }
  return this.ready();
});