import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';

@InputType()
export class UpdateStudentInput extends PartialType(CreateStudentInput) {
  @Field()
  id: string;

  @Field()
  studentName: string;

  @Field()
  gender: string;

  @Field()
  address: string;

  @Field()
  phone: string;

  @Field()
  dob: Date;

  @Field((type) => Int)
  age: number;
}
