import { Between, Not } from 'typeorm';
import { Category } from '../models/Category';
import { Task } from '../models/Task';
import { User } from '../models/User';

export class TasksController {
  async list (): Promise<Task[]> {
    return await Task.find();
  }

  async create (userId: number, description: string,term: string, situation: string, categoryId: number, collaboratorId : number): Promise<Task> {
    let user: User | null = await User.findOneBy({ id: userId });
    if (! user) {
      throw new Error('Usuário não encontrado!');
    }

    let category: Category | null = await Category.findOneBy({ id: categoryId });
    if (! category) {
      throw new Error('Categoria não encontrado!');
    }

    return await Task.create({
      creator_id: userId,
      description: description,
      term : term,
      situation: situation,
      category_id: categoryId,
      collaborator_id: collaboratorId,
    }).save();
  }

  async find (id: number): Promise<Task|null> {
    return await Task.findOneBy({ id });
  }

  async edit (tasks: Task, userId: number, description: string, term: string, situation: string, categoryId: number, collaboratorId : number): Promise<Task> {
    let task: Task | null = await Task.findOneBy({ id: tasks.id });
    if (! task) {
      throw new Error('Tarefa não encontrada!');
    }

    let category: Category | null = await Category.findOneBy({ id: categoryId });
    if (! category) {
      throw new Error('Tarefa não encontrada!');
    }

    task.creator_id = userId;
    task.description = description;
    task.situation = situation;
    task.category_id = categoryId;
    task.collaborator_id = collaboratorId;
    task.save();

    return task;
  }

  async delete (task: Task): Promise<void> {
    await task.remove();
  }
}
