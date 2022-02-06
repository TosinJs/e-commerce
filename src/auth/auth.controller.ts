import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags("Authentication")
@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiResponse({ status: 201, description: "User Logged In Succesfully"})
  @ApiResponse({ status: 400, description: "Bad Request/Something is wrong with the input"})
  @ApiBody({ type: LoginUserDto })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Post("create")
  @ApiResponse({ status: 201, description: "User Created"})
  @ApiResponse({ status: 400, description: "Bad Request/Something is wrong with the input"})
  @ApiResponse({ status: 409, description: "Duplicate Username/User already exists"})
  @ApiBody({ type: CreateUserDto})
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

}
