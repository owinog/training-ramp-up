import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Student {
  @Field((type) => Int)
  stuID: number;

  @Field({ nullable: true })
  studentName?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  dob?: string;
}
