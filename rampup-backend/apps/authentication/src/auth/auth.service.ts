import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthInput } from './dto/auth.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: AuthInput) {
    //check user non existence
    const usr = await this.usersService.findOne(user.username);
    console.log(usr);
    if (!usr) throw new BadRequestException('User Does not Exist');

    //password match
    const isHashMatch = await bcrypt.compare(user.password, usr.password);
    if (!isHashMatch) throw new BadRequestException('Password is incorrect');

    //generate access and refresh tokens
    const tokens = await this.getTokens(user);

    // save refresh token to db
    const newuser = { ...usr, refreshToken: tokens.refresh_token };
    this.usersService.update(newuser);

    return tokens;
  }

  async refreshTokens(token: string) {}

  async logout(username: string) {
    const user = await this.usersService.findOne(username);
    //reseting refresh token
    const usr = { ...user, refreshToken: null };
    //update db
    return await this.usersService.update(usr);
  }

  async getTokens(payload: AuthInput) {
    return {
      access_token: this.jwtService.sign(payload, {
        secret: 'secret_key_for_access_token',
        expiresIn: '60s',
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: 'secret_key_for_refresh_token',
        expiresIn: '10d',
      }),
    };
  }
}
