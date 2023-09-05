import { CategoriesController } from '../controllers/CategoriesController';
import { Category} from '../models/Category';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export class CategoriesMenu {

  public controller: CategoriesController;

  constructor () {
    this.controller = new CategoriesController();
  }

  public show (): void {
    console.log('');
    console.log('========MENU CATEGORIAS============');
    console.log('');
    console.log('[5] - Listar categorias');
    console.log('[6] - Cadastrar novo categoria');
    console.log('[7] - Editar categoria');
    console.log('[8] - Excluir categoria');
    console.log('');
  }

  public async execute (input: string): Promise<void> {
    switch (input) {
      case '5':
        await this.list();
        break;
      case '6':
        await this.create();
        break;
      case '7':
        await this.edit();
        break;
      case '8':
        await this.delete();
        break;
    }
  }

  private async list (): Promise<void> {
    let categories: Category[] = await this.controller.list();
    console.table(categories);
  }

  private async create (): Promise<void> {
    let description: string = prompt('Descrição da categoria: ');
    let situation: string = prompt('Situação: A (ativo) ou I (inativo): ');
    let category: Category = await this.controller.create(description, situation);
    console.log(`Categoria ID #${category.id} criado com sucesso!`);
  }

  private async edit (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let category: Category | null = await this.controller.find(id);
    if (category) {
      let description: string = prompt(`Descrição da categoria: (${category.description})`, category.description);
      let situation: string = prompt(`Situação(A ou I): (${category.situation})`, category.situation);
      category = await this.controller.edit(category, description, situation);
      console.log(`Categoria ID #${category.id} atualizado com sucesso!`);
      category.save();
    } else {
      console.log('Categoria não encontrada!');
    }
  }

  private async delete (): Promise<void> {
    let id: number = Number(prompt('Qual o ID? '));
    let category: Category | null = await this.controller.find(id);
    if (category) {
      await this.controller.delete(category);
      console.log(`Categoria ID #${id} excluído com sucesso!`);
    } else {
      console.log('Categoria não encontrada!');
    }
  }
}
