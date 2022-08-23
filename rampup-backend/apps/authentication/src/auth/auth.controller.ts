import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() data: AuthInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(data);
    res.cookie('refresh-token', tokens.refresh_token, {
      httpOnly: true,
    });
    return { access_token: tokens.access_token };
  }

  @Post('refresh')
  async refreshToken(@Body() data: string) {
    return this.authService.refreshTokens(data);
  }

  @Get('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.cookie('refresh-token'));
  }

  @UseGuards(JwtAuthGuard)
  @Get('home')
  getUser(@Request() req) {
    console.log(req.user);
    return req.user.username;
  }
}
