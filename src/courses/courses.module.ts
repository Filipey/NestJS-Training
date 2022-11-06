import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CoursesController } from './courses.controller';

@Module({
  controllers: [CoursesController],
  providers: [CourseService],
})
export class CoursesModule {}
