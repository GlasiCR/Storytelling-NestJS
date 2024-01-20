import { getRepositoryToken } from '@nestjs/typeorm';
import { userMock } from './user.mock';
import { User } from '../../database/entities/users.entity';
import { listUsersMock } from './listAllUsers.mock';
//Vamos aos mock então!
//Vamos criar um objeto que terá o propósito de simular o Repository, bem como as funções que usamos
//no código real
export const userRepositoryMock = {
  //Repository é a camada de interação com a Entidade no Banco de Dados, logo, preciso ao settar o
  //repository com a Entidade que vamos usar para o teste
  provide: getRepositoryToken(User),
  //Novamente falando do espelho, no "useValue" vamos elencar todas as funções que lá no código real
  //eu precisei para rodar o projeto.
  //E claro! Se quando faço uma chamada no Repository espero uma saída, vou mocar essa saída tbm,
  //afinal dependo dela para prosseguir nos testes.
  //--------------------------------------------------------
  //Exemplo, se faço uma pesquisa no banco para localizar um usuário por id, preciso dessa saída ou
  //para finalizar e dar um retorno para o meu método ou porque dependo desse insumo para prosseguir
  //com a minha lógica
  useValue: {
    //Return porque é sincrono
    create: jest.fn().mockReturnValue(userMock),
    save: jest.fn(),
    //Resolved porque é assincrono
    find: jest.fn().mockResolvedValue(listUsersMock),
    findOneByOrFail: jest.fn().mockReturnValue(listUsersMock[0]),
    findOneOrFail: jest.fn().mockReturnValue(listUsersMock[0]),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  },
  //Tanto a função mockReturnValue() quanto a função mockResolvedValue() são usada para configurar a
  //um retorno para a função espiã.
  //A principal diferença é que a ReturnValue é apropriada quando estamos lidando com operação
  //síncronas enquanto a ResolvedValue é para as assíncronas
};
