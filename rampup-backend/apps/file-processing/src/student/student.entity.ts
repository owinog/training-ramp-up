import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Student {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  studentName: string;

  @Field()
  @Column()
  gender: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  dob: Date;

  @Field(() => Int)
  @Column()
  age: number;

  @Field({ nullable: true })
  @DeleteDateColumn()
  deletedAt: Date;
}
