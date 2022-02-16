import { Controller, Get, Body, Patch, Param, Delete, UseFilters, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from "../core/http-exception.filter";
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { UserGuard } from 'src/auth/roles/user.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags("Users")
@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles(Role.Admin)
  @ApiResponse({ status: 201, description: "Users Returned"})
  @ApiResponse({ status: 400, description: "Bad Request"})
  @ApiResponse({ status: 404, description: "No User In Database"})
  findAll() {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({ status: 201, description: "User Gotten By Id"})
  @ApiResponse({ status: 400, description: "Bad Request"})
  @ApiResponse({ status: 404, description: "User Not In Database"})
  @ApiParam({ type: "string", name: "id" })
  findOne(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @UseGuards(JwtAuthGuard, UserGuard)
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

  @UseGuards(JwtAuthGuard, UserGuard)
  @Delete(':id')
  @ApiResponse({ status: 201, description: "User Deleted"})
  @ApiResponse({ status: 404, description: "User Not In Database"})
  @ApiParam({ type: "string", name: "id"})
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
