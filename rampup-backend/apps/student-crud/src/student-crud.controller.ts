import { Controller, Get } from '@nestjs/common';
import { StudentCrudService } from './student-crud.service';

@Controller()
export class StudentCrudController {
  constructor(private readonly studentCrudService: StudentCrudService) {}

  @Get()
  getHello(): string {
    return this.studentCrudService.getHello();
  }
}
