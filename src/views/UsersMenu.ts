import { UsersController } from '../controllers/UsersController';
import { User } from '../models/User';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export class UsersMenu {

  public controller: UsersController;

  constructor () {
    this.controller = new UsersController();
  }

  public async loginMenu() : Promise<User | null>{
    let email: string = prompt('Insira seu email ');
    let aux: any=this.controller.criptografar(prompt('Insira sua senha '));
    let password: string = aux;


    let controlaUser: UsersController = new UsersController();
    let user: User | null = await User.findOneBy({email : email, password : password});

    return user;
  }

  public show (): void {
    console.log('');
    console.log('========MENU USUÁRIOS===========');
    console.log('');
    console.log('[1] - Listar usuários');
    console.log('[2] - Cadastrar novo usuário');
    console.log('[3] - Editar usuário');
    console.log('[4] - Excluir usuario');
    console.log('');
  }

  public async execute (input: string): Promise<void> {
    switch (input) {
      case '1':
        await this.list();
        break;
      case '2':
        await this.create();
        break;
      case '3':
        await this.edit();
        break;
      case '4':
        await this.delete();
        break;
    }
  }

  private async list (): Promise<void> {
    let users: User[] = await this.controller.list();
    console.table(users);
  }

  private async create (): Promise<void> {
    let name: string = prompt('Nome: ');
    let password = this.controller.criptografar(prompt('Senha: '));

    let email: string = prompt('E-mail: ');
    let situation: string = prompt('Situação(A ou I): ');
    let user: User = await this.controller.create(name, password, email, situation);
    console.log(`Usuário ID #${user.id} criado com sucesso!`);
  }

  private async edit (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let user: User | null = await this.controller.find(id);
    if (user) {
      let name = prompt(`Nome (${user.name}): `, user.name);
      let password = this.controller.criptografar(prompt(`Senha (${user.password}): `, user.password));
      let email = prompt(`E-mail (${user.email}): `, user.email);
      let situation = prompt(`Situação (${user.situation}): `, user.situation);
      user = await this.controller.edit(user, name,  password, email, situation);
      console.log(`Usuário ID #${user.id} atualizado com sucesso!`);
    } else {
      console.log('Usuário não encontrado!');
    }
  }

  private async delete (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let user: User | null = await this.controller.find(id);
    if (user) {
      await this.controller.delete(user);
      console.log(`Usuário ID #${id} excluído com sucesso!`);
    } else {
      console.log('Usuário não encontrado!');
    }
  }
}





