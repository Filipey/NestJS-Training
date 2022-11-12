import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from '../../src/courses/courses.module';

import * as request from 'supertest';
import { CreateCourseDTO } from '../../src/courses/dto/create-course-dto';

describe('Courses: /courses', () => {
  let app: INestApplication;

  const course: CreateCourseDTO = {
    name: 'Jest + NestJs',
    description: 'Testing NestJS applications with Jest testing tool',
    tags: ['NestJS', 'TypeORM', 'NodeJS', 'Typescript'],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoursesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: '12345',
          database: 'devtraining-dbtest',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Create /courses [POST]', () => {
    return request(app.getHttpServer())
      .post('/courses')
      .send(course)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        const expectedCourse = jasmine.objectContaining({
          ...course,
          tags: jasmine.arrayContaining(
            course.tags.map((tag) =>
              jasmine.objectContaining({
                tag,
              }),
            ),
          ),
        });

        expect(body).toEqual(expectedCourse);
      });
  });
});
