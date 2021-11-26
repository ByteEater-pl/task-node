import { Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb'
import { User } from '../models/user.dto';

@Injectable()
export class UserDbService {
  usersCollection: Promise<Collection<User>> =
    new Promise(f => this.resolve = f)
  private resolve: { (arg0: Collection<User>): void }
  constructor() {
    (async () => {
      try {
        const client = await MongoClient.connect('mongodb://localhost/nest');
        process.on('exit', () => client.close());
        this.resolve(client.db().collection('users'));
      } catch { process.exit(); };
    })();
  }
}