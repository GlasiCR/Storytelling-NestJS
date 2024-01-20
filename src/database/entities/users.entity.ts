import { BadRequestException } from '@nestjs/common';
import { User_Role } from '../../enums/user_roles.enum';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { HouseEntity } from './houses.entity';
//Lembrando que, cada Entidade que crio, preciso incluí-la no arquivo de configuração do banco de dados,
//só assim a conexão será realizada corretamente e eu conseguirei manipular os dados desta tabela,
//caso contrário, ao fazer uma requisição retornará erro, pois não encontrará essa tabela no banco.
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 64, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;
  @Column({ type: 'varchar', length: 64, nullable: false, select: false })
  password: string;
  @Column({ type: 'enum', enum: User_Role, nullable: false })
  role: User_Role;
  @OneToMany(() => HouseEntity, (house) => house.seller)
  houses: HouseEntity[];
  @OneToMany(() => HouseEntity, (house) => house.owner)
  myHouses: HouseEntity[];
  @CreateDateColumn({ type: 'date' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;
  //Utilizaremos dos decorators @BeforeInsert() e @BeforeUpdate() para que a função hashPassord seja
  //executada automaticamente sempre que uma operação de inserção ou atualização no banco de dados
  //dessa entidade seja realizada.
  @BeforeInsert()
  @BeforeUpdate()
  //O escopo dessa função é hashear a senha do usuário antes de salvar no banco de dados
  async hashPassword() {
    try {
      //Logo, pegamos a variável que foi declarada a senha, e aplicamos o método hash() da biblioteca do
      //bcrypt.
      //---------------------------------------------------------------
      //Este método faz o seguinte para nós: ele pega a senha que o usuário cadastrou, aplica 10
      //iterações com o algoritmo hash, substitui a senha original pelo hash e só daí que salva o usuário
      //no banco.
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      throw new BadRequestException('Something wrong with password hash');
    }
  }
}
