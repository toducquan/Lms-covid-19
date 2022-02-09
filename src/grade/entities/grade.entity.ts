import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  student_id: number;

  @Column('int')
  test_id: number;

  @Column('int', {
    default: 0,
  })
  grade: number;
}
