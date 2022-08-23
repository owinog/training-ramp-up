import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('login')
  getHello(): string {
    return this.authenticationService.getHello();
  }
}
