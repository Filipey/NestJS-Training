import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDTO } from './dto/create-course-dto';
import { UpdateCourseDTO } from './dto/update-course-dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  findAll() {
    return this.courseRepository.find();
  }

  findOne(id: string) {
    const course = this.courseRepository.findOne(id);

    if (!course) throw new NotFoundException(`Course ${id} not found!`);

    return course;
  }

  create(dto: CreateCourseDTO) {
    const course = this.courseRepository.create(dto);
    return this.courseRepository.save(course);
  }

  async update(id: string, dto: UpdateCourseDTO) {
    const course = await this.courseRepository.preload({
      id: +id,
      ...dto,
    });

    if (!course) throw new NotFoundException(`Course ${id} not found!`);

    return this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne(id);

    if (!course) throw new NotFoundException(`Course ${id} not found!`);

    return this.courseRepository.remove(course);
  }
}
