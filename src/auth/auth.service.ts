import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly UserModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      let newUser = new this.UserModel(createUserDto)
      newUser = await newUser.save()
      return newUser
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new HttpException("Invalid Input Data", HttpStatus.BAD_REQUEST)
      } else if (error.code === 11000) {
        throw new HttpException("Duplicate Username", HttpStatus.CONFLICT)
      }
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const { password, username } = loginUserDto
      let user = await this.UserModel.findOne({ username })
      if (!user) {
        throw new HttpException("Invalid Username/Password", HttpStatus.BAD_REQUEST)
      }
      const validPass = await user.isValidPassword(password)
      if (!validPass) {
        throw new HttpException("Invalid Username/Password", HttpStatus.BAD_REQUEST)
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  
}