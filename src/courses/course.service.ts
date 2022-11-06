import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDTO } from './dto/create-course-dto';
import { UpdateCourseDTO } from './dto/update-course-dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Sistemas de Informação',
      description: 'Curso bão',
      tags: ['TI', 'ADM'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    const course = this.courses.find((course) => course.id === Number(id));

    if (!course)
      throw new HttpException(`Course ${id} not found!`, HttpStatus.NOT_FOUND);

    return course;
  }

  create(dto: CreateCourseDTO) {
    const id = this.courses[this.courses.length - 1].id + 1;
    this.courses.push({ id, ...dto });
    return dto;
  }

  update(id: string, dto: UpdateCourseDTO) {
    const index = this.courses.findIndex((course) => course.id === Number(id));

    if (index < 0)
      throw new HttpException(`Course ${id} not found!`, HttpStatus.NOT_FOUND);

    this.courses[index] = {
      id: Number(id),
      name: dto.name ? dto.name : this.courses[index].name,
      description: dto.description
        ? dto.description
        : this.courses[index].description,
      tags: dto.tags ? dto.tags : this.courses[index].tags,
    };

    return this.courses[index];
  }

  remove(id: string) {
    const index = this.courses.findIndex((course) => course.id === Number(id));

    if (index < 0)
      throw new HttpException(`Course ${id} not found!`, HttpStatus.NOT_FOUND);

    this.courses.splice(index, 1);
  }
}
