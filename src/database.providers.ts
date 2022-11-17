/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { CreateCoursesTable1667947175318 } from './migrations/1667947175318-CreateCoursesTable';
import { CreateTagsTable1667947544881 } from './migrations/1667947544881-CreateTagsTable';
import { CreateCoursesTagTable1667963955490 } from './migrations/1667963955490-CreateCoursesTagTable';
import { AddCoursesIdToCoursesTagsTable1667964300339 } from './migrations/1667964300339-AddCoursesIdToCoursesTagsTable';
import { AddTagsIdToCoursesTagsTable1667964767121 } from './migrations/1667964767121-AddTagsIdToCoursesTagsTable';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: '12345',
        database: 'devtraining',
        entities: [__dirname + '../**/*.entity.js'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'devtraining',
  entities: [__dirname + '../**/*.entity.js'],
  synchronize: false,
  migrations: [
    CreateCoursesTable1667947175318,
    CreateTagsTable1667947544881,
    CreateCoursesTagTable1667963955490,
    AddCoursesIdToCoursesTagsTable1667964300339,
    AddTagsIdToCoursesTagsTable1667964767121,
  ],
});
