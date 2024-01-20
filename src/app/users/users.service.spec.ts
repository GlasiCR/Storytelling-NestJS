import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { userRepositoryMock } from '../../testing/users/userRepository.mock';
import { listUsersMock } from '../../testing/users/listAllUsers.mock';
import { NotFoundException } from '@nestjs/common';

//O principal foco no teste unitário é validarmos as entradas e saídas Fazemos isso a partir de muito
//mock.
//Vamos isolamos cada parte do código para testá-lo, então mockamos as entradas e saídas a fim de
//verificar se o comportamento é conforme a nossa expectativa.
//Mas não se deixe enganar que isso por gerar alguma ineficiência, a qualidade dos dados mocados tbm
//traz benefícios, uma vez que você tem uma fotografia fiel do que se espera das entradas e saídas
//seu código fica muito mais fácil de dar manutenção
//----------------------------------------------------------
//Os arquivos de mock encontram-se nota: "../../testing/", e lá segregado de acordo com sua respectiva
//entidade
describe('UsersService', () => {
  let userService: UsersService;
  //O beforeEach(fornecido pelo Jest) é uma função, ou hook, usado para definir um bloco de código
  //que deverá ser executado antes de cada grupo específico, neste caso, o que estiver dentro do
  //forEach deverá rodar antes de cada teste.
  beforeEach(async () => {
    //O que então deverá rodar antes de cada bloco, ou teste, desde describe (linha 6)? Um module
    //----------------------------------------------------------
    //Uma vez que são a partir dos modules que a aplicação no Nest é executada, também vamos precisar
    //de um module para realizar os testes, afinal se para rodar meu projeto eu preciso de um
    //Repository, uma Entidade, uma biblioteca externa (JWT, por exemplo), para fazer o teste não será
    //diferente
    //----------------------------------------------------------
    //A função createTestingModule fornecida pelo Nest é quem vai construir este module pra gente.
    //O retorno dela é uma instância do tipo TestingModule, que nada mais é do que o nosso módulo de
    //teste semelhante a um módulo normal. O parametro por sua vez é o mesmo que o um módulo normal:
    //providers, controladores e assim por diante
    const module: TestingModule = await Test.createTestingModule({
      //Para sabermos o que vou colocar neste objeto, preciso espelhar o modulo da entidade que estou
      //testando aqui. A dinâmica é tão simples quanto; olho para o userModule e replico ela aqui
      //----------------------------------------------------------
      //O UserService não tem tanto segredo, pois ele está discriminado no arquivo user.module.ts,
      //talvez aqui surja dúvidas com relação ao useRepository.
      //----------------------------------------------------------
      //Estamos trabalhando aqui nos testes de unitários e não de integração, nosso objetivo é testar
      //a menor fração do nosso código. Logo, como não quero testar a integração com o Banco de Dados,
      //vamos mocar o Repository, a camada responsavél por essa interação.
      //o userRepository aqui seria o TypeOrmModule.forFeature() do user.module.ts. É como se
      //estivessemos criando nosso próprio ORM. Vou criar um arquivo no qual mocarei todas as funções
      //que uso no meu código para interagir com o banco.
      providers: [UsersService, userRepositoryMock],
      //Após concluir a configurção do meu module de testes, agora preciso que ele seja executado, o
      //.compile é que vai fazer isso.
    }).compile();
    //Novamente, este é um teste unitário!
    //É importante para nós isolarmos o que estamos testando.
    //Embora seja um ambiente de teste onde há muitos dados mocados, aqui eu crio uma instância real do
    //UserService e todas as dependências que ele precisa para rodar, será mocado
    //Na linha 7 eu criei a variável aqui estou apenas dando valor à ela.
    userService = module.get<UsersService>(UsersService);
  });
  //Esse trecho de código representa um teste unitário que verifica se o serviço userService foi
  //devidamente inicializado e está definido dentro do contexto do módulo de teste.
  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
  //Repetindo, para fazermos os testes, precisamos espelhar nosso código aqui.
  //A melhor dinâmica para fazer isso é de um lado deixar o código e do outro o teste
  //Cada bloco describe trata-se do teste de um determinado cenário
  //Visando organização, entre '' sugiro colocar o nome da função que está testando, assim fica mais
  //fácil se localizar quando executar o teste e sair o resultado.
  describe('Find all users', () => {
    //Semelhante a sugestão anterior, entre '' informar qual o resultado que espera para o cenário
    //que está testando
    //----------------------------------------------------------
    //Assim como no código, é importante escrever os testes se preocupando com o entendimento de
    //qualquer pessoa que pegá-lo para trabalhar. Deve estar inteligível e para todos os níveis, assim
    //qualquer pessoa poderá mexer no código sem obstáculos
    it('Should return an list of users', async () => {
      //Agora vamos ao espelho!
      //Este método no código é um get, simples, que retorna uma lista com todos os usuário cadastrados
      //Então, declaro uma variável para a execução deste método, const result
      const result = await userService.findAll();
      //E informo qual o resultado que espero, a lista com os usuários!
      //Uma vez que não estamos trabalhando com teste de integração, nós mocaremos uma lista com
      //o formato que esperamos receber.
      //Vale ressaltar a preocupação neste mock. Seja o mais fiel possível, pois teste bem escrito,tbm
      //serve de documentação.
      //----------------------------------------------------------
      //Imagina você pegar um código para manutenção. Por sorte escreveram os testes. Ao analisar os
      //mocks, fica muito mais tangível quais as saídas e entradas de cada método, não tenho dúvidas
      //que isso vai facilitar muito a realização da tarefa que terá que executar
      expect(result).toEqual(listUsersMock);
    });
  });
  //Importante testar todos os cenários que um método pode receber, quanto maior a abrangência dos
  //testes, menos as chances de erro no código temos.
  //----------------------------------------------------------
  //Vamos testar o método de localizar usuário por id, mas no cenário que foi passado um usuário que
  //não existe
  describe('Not find user by Id', () => {
    it('Should return the user of the given id', async () => {
      //Novamente espelhando o método real. Para cair nesta situação precisamos que o retorno da
      //função "findOneByOrFail() seja falso, assim "caímos" no catch(). Lá vamos nós de mais um mock
      //O jest oferece pra gente essa possibilidade.
      jest
        //Uso o jest combinado ao spyOn para ficar "vigiando" a função que preciso configurar a saída e
        //cair no cenário que preciso.
        //Logo, do Repository(mock) vou ficar de olho para que quando chegar na função em questão ela
        //retorne um erro e não o usuário conforme configurei lá no arquivo repositoryMock.
        //Ao usar o mockRejectedValueOnce() ele vai me devolver erro
        .spyOn(userRepositoryMock.useValue, 'findOneByOrFail')
        .mockRejectedValueOnce('deu erro');
      //E daí sigo normalmente: declaro variável com o resultado da função, passo o parametro que
      //ela está esperando, neste cao moquei o id do usuário e configuro qual a minha expectativa
      //de saída
      const result = userService.findOne(1);
      expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('Find user by Id', () => {
    it('Should return the user of the given id', async () => {
      const result = await userService.findOne(1);

      expect(result).toEqual(listUsersMock[0]);
    });
  });

  describe('Find user by email', () => {
    it('Should return the user of the given email', async () => {
      const result = await userService.findUserByEmail(listUsersMock[0].email);

      expect(result).toEqual(listUsersMock[0]);
    });
  });

  describe('Update', () => {
    it('Should return updated user data', async () => {
      const result = await userService.update(1, listUsersMock[0]);
      expect(result).toEqual(listUsersMock[0]);
    });
  });
});
