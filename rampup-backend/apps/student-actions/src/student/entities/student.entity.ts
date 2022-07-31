import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Student {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  stuID: String;

  @Field()
  @Column()
  studentName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  gender?: string;

  @Field()
  @Column()
  address?: string;

  @Field()
  @Column()
  phone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dob?: string;
}
