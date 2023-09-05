import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

@Entity('tasks')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'timestamp', default: 'NOW()' })
  public create_at: Date;

  @Column()
  public description: string;

  @Column({
    type: 'date'
  })
  public term: Date;

  @Column()
  public situation: string;

  @Column()
  public creator_id: number;

  @Column()
  public category_id: number;

  @Column()
  public collaborator_id: number;

  @ManyToOne(() => User, (user) =>user.tasks)
  @JoinColumn({name : 'create_id'})
  public creator: Promise<User>;

  @ManyToOne(() => User, (user) =>user.tasks)
  @JoinColumn({name : 'collaborator_id'})
  public collaborator: Promise<User>;

  @ManyToOne(() => Category, (category) =>category.id)
  @JoinColumn({name : 'category_id'})
  public category: Promise<Category>;
}
