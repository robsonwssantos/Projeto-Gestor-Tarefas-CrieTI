import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { Task } from "./Task";

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public description: string;

  @Column()
  public situation: string;

  @OneToMany(() => Task, (task) => task.category_id)
  public tasks: Promise<Task[]>;
}
