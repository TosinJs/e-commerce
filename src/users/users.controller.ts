import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("Users")
@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard("jwt"))
  tempAuth() {
    return { auth: "works"}
  }

  @Get()
  @ApiResponse({ status: 201, description: "Users Returned"})
  @ApiResponse({ status: 400, description: "Bad Request"})
  @ApiResponse({ status: 404, description: "No User In Database"})
  findAll() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: "User Gotten By Id"})
  @ApiResponse({ status: 400, description: "Bad Request"})
  @ApiResponse({ status: 404, description: "User Not In Database"})
  @ApiParam({ type: "string", name: "id" })
  findOne(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Patch(":id")
  @ApiResponse({ status: 201, description: "User Updated By Id"})
  @ApiResponse({ status: 400, description: "Bad Request"})
  @ApiResponse({ status: 404, description: "User Not In Database"})
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ type: "string", name: "id"})
  updateUser(
    @Body() updateUserDto: UpdateUserDto, 
    @Param("id") id: string) {
      return this.usersService.updateUser(id, updateUserDto)
  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: "User Deleted"})
  @ApiResponse({ status: 404, description: "User Not In Database"})
  @ApiParam({ type: "string", name: "id"})
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
