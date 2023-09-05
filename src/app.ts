import DB from './db';
import { UsersMenu } from './views/UsersMenu';
import { CategoriesMenu } from './views/CategoriesMenu';
import { TasksMenu } from './views/TasksMenu';
import promptSync from 'prompt-sync';

const prompt = promptSync();

async function main(): Promise<void> {
  await DB.initialize();


  // Inicializa os menus
  let usersMenu: UsersMenu = new UsersMenu();
  let categoriesMenu: CategoriesMenu = new CategoriesMenu();
  let tasksMenu: TasksMenu = new TasksMenu();

  let input: string = '';

  do{
    let user = usersMenu.loginMenu()
    if(await user){

      do {
        console.clear();

        usersMenu.show();
        categoriesMenu.show();
        tasksMenu.show();
        console.log('0 - Sair');

        input = prompt('Selecione a opção desejada: ');

        if (input != '0') {

          await usersMenu.execute(input);
          await categoriesMenu.execute(input);
          await tasksMenu.execute(input, await user);
          console.log(' ')
          prompt('ATENÇÃO PRECIONE [ENTER] PARA CONTINUAR');
        }
      } while (input != '0');
    }else{
      console.log('Usuário ou senha incorretos');
      input = prompt('Aperte [ENTER] para continuar ou [0] sair: ');
    }
  }while (input != '0');
}
main();
