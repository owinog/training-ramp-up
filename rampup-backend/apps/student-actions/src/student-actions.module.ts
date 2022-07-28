import { Module } from '@nestjs/common';
import { StudentActionsController } from './student-actions.controller';
import { StudentActionsService } from './student-actions.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { StudentsResolver } from './students/students.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [StudentActionsController],
  providers: [StudentActionsService, StudentsResolver],
})
export class StudentActionsModule {}
