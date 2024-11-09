import { DataSource } from 'typeorm';
import { User } from './modules/user/entites/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5336,
  username: 'pguser',
  password: 'pgpassword',
  database: 'nest-api',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
