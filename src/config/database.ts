import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const DbConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: '25092000',
  database: 'project3',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
export default DbConfig;
