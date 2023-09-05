import { Category} from '../models/Category';

export class CategoriesController {
  async list (): Promise<Category[]> {
    return await Category.find();
  }

  async create (description: string, situation: string): Promise<Category> {
    return await Category.create({
      description,
      situation,
    }).save();
  }

  async find (id: number): Promise<Category|null> {
    return await Category.findOneBy({ id });
  }

  async edit (category: Category,description: string, situation: string): Promise<Category> {
    category.description = description;
    category.situation = situation;
    return category;
  }

  async delete (category: Category): Promise<void> {
    await category.remove();
  }
}
