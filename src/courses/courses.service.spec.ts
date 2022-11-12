/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
});

describe('CoursesService', () => {
  let service: CourseService;
  let courseRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Course),
          useValue: createMockRepository(),
        },
        { provide: getRepositoryToken(Tag), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    courseRepository = module.get<MockRepository>(getRepositoryToken(Course));
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find course by ID', () => {
    it('Should return a Course', async () => {
      const courseId = '1';
      const expectedCourse = {};
      courseRepository.findOne.mockReturnValue(expectedCourse);

      const course = await service.findOne(courseId);
      expect(course).toEqual(expectedCourse);
    });

    it('Should throw a NotFoundException', async () => {
      const courseId = '1';
      courseRepository.findOne.mockReturnValue(undefined);

      try {
        await service.findOne(courseId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Course ${courseId} not found!`);
      }
    });
  });
});
