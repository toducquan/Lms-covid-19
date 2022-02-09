import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  user_id: number;

  @Column('text', {
    nullable: true,
  })
  deadline: string;

  @Column('int')
  factor: number;

  @Column('json', {
    nullable: true,
  })
  question: any;
}
