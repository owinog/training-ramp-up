import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Student } from './student/student.entity';
import { FileProcessingConsumer } from './file-processing.consumer';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'rampupdb',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Student]),
    BullModule.registerQueue({ name: 'file-queue' }),
  ],
  providers: [FileProcessingConsumer],
})
export class FileProcessingModule {}
