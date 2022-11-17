import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCourseDTO } from './dto/create-course-dto';
import { UpdateCourseDTO } from './dto/update-course-dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CourseService {
  @Inject('COURSE_REPOSITORY')
  private readonly courseRepository: Repository<Course>;

  @Inject('TAG_REPOSITORY')
  private readonly tagRepository: Repository<Tag>;

  async findAll() {
    return this.courseRepository.find({ relations: ['tags'] });
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      relations: ['tags'],
      where: { id },
    });

    if (!course) throw new NotFoundException(`Course ${id} not found!`);

    return course;
  }

  async create(dto: CreateCourseDTO) {
    const tags = await Promise.all(
      dto.tags.map((name) => this.preloadTagByName(name)),
    );

    const course = this.courseRepository.create({ ...dto, tags });

    return this.courseRepository.save(course);
  }

  async update(id: string, dto: UpdateCourseDTO) {
    const tags =
      dto.tags &&
      (await Promise.all(dto.tags.map((name) => this.preloadTagByName(name))));

    const course = await this.courseRepository.preload({
      id: id,
      ...dto,
      tags,
    });

    if (!course) throw new NotFoundException(`Course ${id} not found!`);

    return this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course) throw new NotFoundException(`Course ${id} not found!`);

    return this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name } });

    if (tag) return tag;

    return this.tagRepository.create({ name });
  }
}
