import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../database/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepostory: Repository<User>,
  ) {}

  findAll() {
    return this.userRepostory.find();
  }

  async findOne(id: number) {
    try {
      return await this.userRepostory.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException('deu erro');
    }
  }

  findUserByEmail(email: string) {
    try {
      return this.userRepostory.findOneOrFail({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          role: true,
        },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { affected } = await this.userRepostory.update(id, updateUserDto);

      if (affected === 0) {
        throw new BadRequestException();
      }

      const user = await this.findOne(id);
      return user;
    } catch (error) {
      throw new HttpException(
        error.message || 'Server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async delete(id: number) {
    try {
      if (!id) {
        throw new BadRequestException('Id must be a integer');
      }

      const { affected } = await this.userRepostory.delete(id);

      if (affected === 0) {
        throw new NotFoundException('User not found');
      }

      return {
        message: 'User deleted with success!!',
      };
    } catch (error) {
      throw new HttpException(
        error?.message || 'Server error',
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
