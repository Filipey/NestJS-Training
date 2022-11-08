import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseService } from './course.service';
import { CoursesController } from './courses.controller';
import { Course } from './entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CoursesController],
  providers: [CourseService],
})
export class CoursesModule {}
