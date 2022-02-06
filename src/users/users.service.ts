import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  private readonly checkIfUserExists = async (id: string) => {
    try {
      const user = await this.UserModel.findById(id)
      if (!Object.keys(user)) {
        throw new HttpException("User not Found", HttpStatus.NOT_FOUND)
      }
      return user
    } catch (error) {
      if (error.name === "CastError") {
        throw new HttpException("Invalid User ID", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(error.message || "Internal Server Error", error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getUsers(): Promise<ReturnUserDto[]>{
    try {
      const users = await this.UserModel.find()
      if (!users.length) {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
      }
      const reqUser = users.map((user) => {
        const {password, ...reqUserData} = user
        return reqUserData
      })
      return reqUser
    } catch (error) {
      throw new HttpException(error.message || 500, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getUser(id: string): Promise<ReturnUserDto>{
    try {
      let user = await this.UserModel.findById(id)
      if (!user) {
        throw new HttpException("Invalid Username/Password", HttpStatus.BAD_REQUEST)
      }
      const { password, ...reqUser} = user
      return reqUser;
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<ReturnUserDto>{
    try {
      await this.checkIfUserExists(id)
      const updatedUser = await this.UserModel.findByIdAndUpdate(id, updateUserDto)
      const {password, ...reqUpdatedUser} = updatedUser
      return reqUpdatedUser
    } catch (error) {
      throw new HttpException(error.message || "Internal Server Error", error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteUser(id: string) {
    try {
      await this.checkIfUserExists(id)
      const result = await this.UserModel.findByIdAndDelete(id)
      return result
    } catch (error) {
      throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
