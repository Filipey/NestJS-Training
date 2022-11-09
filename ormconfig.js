/* eslint-disable prettier/prettier */
module.exports = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'devtraining',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
