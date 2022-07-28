import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class StudentsResolver {
  @Query(() => String)
  getStudent() {
    return 'This is the response';
  }
}
