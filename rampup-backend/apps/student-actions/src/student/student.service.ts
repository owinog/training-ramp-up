import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}
  create(createStudentInput: CreateStudentInput) {
    return 'This action adds a new student';
  }

  async findAll(): Promise<Student[]> {
    // return this.studentRepository.find();
    let stu: Student = new Student();
    stu.stuID = '123123';
    stu.studentName = 'owin';
    stu.address = 'negombo';
    stu.phone = '0123123123';
    return [stu];
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentInput: UpdateStudentInput) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
