import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('int')
  hrm_id: number;

  @Column('int', {
    nullable: true,
  })
  math_id: number;

  @Column('int', {
    nullable: true,
  })
  english_id: number;

  @Column('int', {
    nullable: true,
  })
  literature_id: number;
}
