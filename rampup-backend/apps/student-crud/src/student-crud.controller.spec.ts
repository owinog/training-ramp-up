import { Test, TestingModule } from '@nestjs/testing';
import { StudentCrudController } from './student-crud.controller';
import { StudentCrudService } from './student-crud.service';

describe('StudentCrudController', () => {
  let studentCrudController: StudentCrudController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StudentCrudController],
      providers: [StudentCrudService],
    }).compile();

    studentCrudController = app.get<StudentCrudController>(StudentCrudController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(studentCrudController.getHello()).toBe('Hello World!');
    });
  });
});
