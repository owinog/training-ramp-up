import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadServiceController } from './file-upload-service.controller';
import { FileUploadServiceService } from './file-upload-service.service';

describe('FileUploadServiceController', () => {
  let fileUploadServiceController: FileUploadServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FileUploadServiceController],
      providers: [FileUploadServiceService],
    }).compile();

    fileUploadServiceController = app.get<FileUploadServiceController>(FileUploadServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fileUploadServiceController.getHello()).toBe('Hello World!');
    });
  });
});
