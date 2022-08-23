import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserInput): Promise<User> {
    //check user existence
    const u = await this.findOne(user.username);
    if (u) throw new BadRequestException('Username Already Exists');

    //hash password
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    let usr = this.userRepository.create({
      ...user,
      password: hash,
    });
    return await this.userRepository.save(usr);
  }

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }

  async update(user: CreateUserInput): Promise<User> {
    let usr = this.userRepository.create({
      ...user,
    });
    return await this.userRepository.save(usr);
  }
}
