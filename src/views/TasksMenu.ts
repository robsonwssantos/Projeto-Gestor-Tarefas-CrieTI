import {TasksController } from '../controllers/TasksController';
import { User } from '../models/User';
import promptSync from 'prompt-sync';
import { Task } from '../models/Task';
import { Between, Timestamp } from 'typeorm';

const prompt = promptSync();

export class TasksMenu {

  public controller: TasksController;

  constructor () {
    this.controller = new TasksController();
  }

  public show (): void {
    console.log('');
    console.log('========MENU TAREFAS============');
    console.log('');
    console.log('[9] - Filtro de Tarefas');
    console.log('[10] - Cadastrar novo tarefa');
    console.log('[11] - Editar tarefa');
    console.log('[12] - Excluir tarefa');
    console.log('');
  }

  public async execute (input: string, user: User| null): Promise<void> {
    switch (input) {
      case '9':
        await this.list( user);
        break;
      case '10':
        await this.create();
        break;
      case '11':
        await this.edit();
        break;
      case '12':
        await this.delete();
        break;
    }
  }

  private async list (user: User | null): Promise<void> {
    let control: string = '';
    let tasks: Task[] = await this.controller.list();

    do{
      console.log('');
      console.log('========FILTRO DE TAREFAS============');
      console.log('');
      console.log('[1] Exibir todas as tarefas');
      console.log('[2] Exibir tarefas por categoria');
      console.log('[3] Exibir tarefas por período');
      console.log('[4] Exibir tarefas por situação');
      console.log('[5] Exibir tarefas criadas por mim');
      console.log('[6] Exibir tarefas que sou executor');
      console.log('[0] VOLTAR AO MENU ANTERIOR');
      console.log('');
      control = prompt('Insira a opção desejada: ');
      switch(control){
        case '1':
          console.table(tasks);
        break;
        case'2':
          let category : number = Number(prompt('Insira o id da categoria '));
          let categories : Task[] = await Task.find({
            where: {
              category_id: category
            }
          });
          console.table(categories);
        break;
        case '3':
          let start: Date = new Date(prompt('Insira a data inicio formato yyyy/mm/dd: '));
          let end: Date = new Date(prompt('Insira a data no formato yyyy/mm/dd '));
          let periods : Task[] = await Task.find({
            where: {
              term: Between(start, end),
            },
          });
          console.table(periods);
        break
        case '4':
          let situation: string = prompt('Informe a situação que deseja');
          let situations: Task[] = await Task.find({
            where:{
              situation: situation
            }
          })
          console.table(situations)
        break
        case '5':
          let creators: Task[] = await Task.find({
            where:{
              creator_id : user?.id
            }
          })
          console.table(creators);
        break
        case '6':
          let users: Task[] = await Task.find({
            where:{
              collaborator_id: user?.id
            }
          })
          console.table(users)
        break
      }
    }while( control != '0');
  }

  private async create (): Promise<void> {
    let userId: number = Number(prompt('ID do criador da tarefa: '));
    let description: string = prompt('Situação: A (à fazer), F (fazendo), C (concluída) ou I (inativa): ');
    let term: string = prompt('Data de entrega no formato yyyy/mm/dd: ');
    let situation: string = prompt('Situação(a ou i): ');
    let categoryId: number = Number(prompt('ID da categoria: '));
    let collaboratorId: number = Number(prompt('ID dos colaboradores: '));
    try {
      let task: Task = await this.controller.create(userId, description, term, situation, categoryId, collaboratorId);
      console.log(`Tarefa ID #${task.id} criada com sucesso!`);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  private async edit (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let task: Task | null = await this.controller.find(id);
    if (task) {
      let userId: number = Number(prompt('ID do criador da tarefa: '));
      let description: string = prompt('Descrição da tarefa: ');
      let term: string = prompt('Data de entrega yyyy/mm/dd: ');
      let situation: string = prompt('Situação: A (à fazer), F (fazendo), C (concluída) ou I (inativa): ');
      let categoryId: number = Number(prompt('ID da categoria: '));
      let collaboratorId: number = Number(prompt('ID dos colaborador: '));
      task.save();
      try {
        task = await this.controller.edit(task,userId, description, term, situation, categoryId, collaboratorId);
        console.log(`Tarefa ID #${task.id} atualizada com sucesso!`);
      } catch (error: any) {
        console.log(error.message);
      }

    } else {
      console.log('Tarefa não encontrada!');
    }
  }

  private async delete (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let task: Task | null = await this.controller.find(id);
    if (task) {
      await this.controller.delete(task);
      console.log(`Tarefa ID #${id} excluída com sucesso!`);
    } else {
      console.log('Tarefa não encontrada!');
    }
  }
}
