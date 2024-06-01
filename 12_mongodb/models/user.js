import { ObjectId } from 'mongodb';
import { getDb } from '../util/database.js';
class User {
  constructor(userName, email) {
    this.userName = userName;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: ObjectId.createFromHexString(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => console.error(err));
  }
}

export default User;
