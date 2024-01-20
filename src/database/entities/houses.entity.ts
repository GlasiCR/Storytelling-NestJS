import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entity';
@Entity()
export class HouseEntity {
  //Este decorator indica a coluna/atributo que será a chave primária
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  city: string;
  @Column()
  neighborhood: string;
  @Column()
  street: string;
  @Column()
  number: string;
  @Column()
  price: number;
  @Column()
  area: number;
  //A partir daqui falaremos sobre relacionamentos.
  //Usaremos dos decoratores para sinalizar ao NestJS como as tabelas se relacionarão

  //@One-to-One - refere-se ao relacionamento um-para-um, ou seja, uma pessoa só pode ter um CPF e
  //um CPF só pode ser de uma pessoa, por exemplo;

  //@One-to-Many / @Many-to-One - é a situação que a relação é de um para muitos, por exemplo, uma
  //mãe pode ter vários filhos, mas um filho só pode ter uma mãe. Se mãe e filhos pertencessem a
  //tavelas diferentes essa seria a relação;

  //@Many-to-Many - onde um registro em uma tabela pode estar associado a vários registros em outra
  //tabela e vice-versa, ou muitos para muitos. Exemplificando, um tio pode ter muitos sobrinhos e o
  //sobrinho pode ter vários tios.

  //Para as tabelas se relacionarem existem algumas estruturas (não sei se essa é a palavra correta)
  //que nos ajudam a construir essa associação no banco. Além de indicarmos quais os campos se
  //relacionarão com quais tabelas e o tipo, existe a chave estrangeira.

  //Chave estrangeira é quem estabelece uma relação entre duas tabelas. A coluna que tiver essa
  //sinalização indica que este campo está fazendo referência à chave primária (ou uma outra chave
  //única) de outra tabela.
  //Exemplo: temos uma tabela de pessoa física e outra de pessoa jurídica. Na tabela PJ há um campo
  //sócios. Este campo será a chave estrangeira que estará se relacionando com o campo CPF da tabela
  //PF.

  //Indicamos que determinado campo é uma chave estrangeira utilizando o decorator @JoinColumn()
  //Essa indicação é precisa somente nos relacionamento One-to-One (na Many-to-Many quando opto por não
  //ter uma tabela pivo também utilizo). Escolhemos a tabela "dona da informação" e colocamos o
  //decorator no campo que vai receber as referências da outra tabela.
  //Já os casos One-to-Many não precisamos do decorator, pois o NestJS infere automaticamente a chave
  //estrangeira no lado "muitos"

  //Nos relacionamentos Many-to-Many é comum criarmos uma tabela pivo. Essa tabela pivo é a
  //união dos dados de duas tabelas, possui pelo menos duas colunas e usamos o decorator @JoinTable()
  //para sua "construção".
  //Quando não passamos nada no parametro, o Nest automaticamente determina um nome para a tabela, que
  //será o nome de ambas as tabelas separadas por _ e a chave estrangeira será o nome da entidade
  // seguidas por "_id", exemplo: user_id.
  //-----------------------------------------------------------------
  //Agora sobre a sintaxe:
  //Coloco o decorator de acordo com o tipo de relacionamos, como argumento vou indicar qual a tabela
  //que se relaciona.
  //Importante ter o decorator de relacionamento em ambas as tabelas para não gerar erro.
  @ManyToOne(() => User, (user) => user.houses)
  seller: User;
  @ManyToOne(() => User, (user) => user.myHouses)
  owner: User;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;

  //Exemplo de sintaxe para os outros tipos de associações:
  // @ManyToMany(() => Sobrinho, (sobrinho) => sobrinho.tio, {
  // })
  //Veja que aqui estou indicando a tabela pivo, este decorator pode estar em apenas um dos lados
  // @JoinTable()
  // sobrinho: Sobrinho[];

  //One-to-One:
  // @OneToOne(() => User, (user) => user.driversLicense)
  //Além de indicar a relação estou comunicando que este campo será a chave estrangeira
  // @JoinColumn()
  // user: User;

  //Na outra tabela, a sintaxe está apenas assim, indicando a relação:
  // @OneToOne(() => DriversLicense, (dl) => dl.user)
  // driversLicense: DriversLicense;

  //-----------------------------------------------------------------

  //Outro ponto importante para se falar de relacionamentos é como será o reflexo das transações de
  //persistência dos dados entre as entidade que se relacionam, por exemplo, se eu apagar um CPF da
  //tabela PF, como deve ser o comportamento na tabela PJ? Apaga também ou não?

  //A indicação do atributo cascade: true, indica esse comportamente.
  //Na sintaxe fica assim:
  // @ManyToMany(() => User, (user) => user.auctions, {
  //   cascade: true,
  // })
  //Há a situação que, mesmo que haja a deleção desejamos que o registro continue no banco, neste caso
  //usamos o onDelete: 'SET NULL'
}
