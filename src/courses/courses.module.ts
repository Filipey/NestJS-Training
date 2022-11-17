import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { courseProviders } from './course.providers';
import { CourseService } from './course.service';
import { CoursesController } from './courses.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CoursesController],
  providers: [...courseProviders, CourseService],
})
export class CoursesModule {}
