import { Test, TestingModule } from '@nestjs/testing';
import { FileProcessingController } from './file-processing.controller';
import { FileProcessingService } from './file-processing.service';

describe('FileProcessingController', () => {
  let fileProcessingController: FileProcessingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FileProcessingController],
      providers: [FileProcessingService],
    }).compile();

    fileProcessingController = app.get<FileProcessingController>(FileProcessingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fileProcessingController.getHello()).toBe('Hello World!');
    });
  });
});
