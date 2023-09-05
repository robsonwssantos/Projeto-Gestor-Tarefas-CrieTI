import { User } from '../models/User';
import { Md5} from 'ts-md5';
import SHA1 from 'tshash/SHA1';
import {ParallelHasher} from 'ts-md5';

export class UsersController {

  async list (): Promise<User[]> {
    return await User.find();
  }

  async create (name: string, password: any, email: string, situation: string): Promise<User> {
    return await User.create({
      name,
      password,
      email,
      situation,
    }).save();
  }

  async find (id: number): Promise<User|null> {
    return await User.findOneBy({ id });
  }

  async edit (user: User, name: string, password: any, email: string, situation: string): Promise<User> {
    user.name = name;
    user.email = email;
    user.password = password;
    user.situation = situation;
    await user.save();

    return user;
  }

  async delete (user: User): Promise<void> {
    await user.remove();
  }

  public DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    segredo : "chaves",
    tipo : "hex"
  };
  criptografar(password: string) {

    const crypto = require("crypto");
    const cipher = crypto.createCipher(this.DADOS_CRIPTOGRAFAR.algoritmo, this.DADOS_CRIPTOGRAFAR.segredo);

	  cipher.update(password);
	  return cipher.final(this.DADOS_CRIPTOGRAFAR.tipo);
  };
}
