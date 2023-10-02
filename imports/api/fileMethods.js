import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ImagesCollection } from '../db/FilesCollection';

Meteor.methods({
  'images.insert'(fileData) {
    check(fileData, Object);
    if (this.userId) {
      ImagesCollection.upsert({ _userId: this.userId }, { $set: { _userId: this.userId, ...fileData } });
    } else {
      throw new Meteor.Error('not-authorized', 'Usuário não autenticado.');
    }
  },

  'images.getById'(userId) {
    check(userId, String);
    const profileImage = ImagesCollection.findOne({ _userId: userId });
    if (!profileImage) {
      throw new Meteor.Error('Image-not-found', 'Image not found');
    }
    return profileImage;
  },
});
