import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserInput } from './dto/createUser.input';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async create(@Body() userData: CreateUserInput) {
    return await this.usersService.create(userData);
  }
}
