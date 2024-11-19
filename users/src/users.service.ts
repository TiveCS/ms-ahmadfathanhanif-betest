import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: IUser): Promise<User> {
    const newUser = new this.userModel(user);

    return newUser.save();
  }

  async updateById(id: string, user: IUser): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async deleteById(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async getByAccountNumber(accountNumber: string): Promise<User> {
    return this.userModel
      .findOne({
        accountNumber,
      })
      .exec();
  }

  async getByIdentityNumber(identityNumber: string): Promise<User> {
    return this.userModel
      .findOne({
        identityNumber,
      })
      .exec();
  }
}
