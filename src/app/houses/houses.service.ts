import { Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HouseEntity } from '../../database/entities/houses.entity';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { UsersService } from '../users/users.service';
import { User_Role } from '../../enums/user_roles.enum';
import { BuyHouseDto } from './dto/buy-house.dto';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(HouseEntity)
    private houseRepository: Repository<HouseEntity>,

    private userService: UsersService,
  ) {}

  async create(createHouseDto: CreateHouseDto) {
    try {
      const owner = await this.userService.findOne(createHouseDto.ownerdId);
      const seller = await this.userService.findOne(createHouseDto.sellerId);
      const house = this.houseRepository.create(createHouseDto);

      house.owner = owner;
      house.seller = seller;

      await this.houseRepository.save(house);

      return house;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async buyHouse(houseId: number, buyHouseDto: BuyHouseDto) {
    // se a casa está disponível
    try {
      // userId -> Buyer
      const user = await this.userService.findOne(buyHouseDto.userId);

      // Se é um buyer
      if (user.role !== User_Role.buyer) {
        throw new ConflictException('User role isnt BUYER');
      }

      // se a casa está disponível
      const house = await this.findOne(houseId);

      if (!house.seller) {
        throw new ConflictException('House isnt to sell');
      }

      house.owner = user;
      house.seller = null;

      await this.houseRepository.save(house);

      return house;
    } catch (error) {
      throw new HttpException(
        error?.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const houses = await this.houseRepository.find({
        relations: {
          owner: true,
          seller: true,
        },
      });
      return houses;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException();
    }
    try {
      const house = await this.houseRepository.findOneOrFail({
        where: { id },
        relations: {
          seller: true,
          owner: true,
        },
      });

      return house;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateHouseDto: UpdateHouseDto) {
    try {
      const { affected } = await this.houseRepository.update(
        id,
        updateHouseDto,
      );

      if (affected === 0) {
        throw new NotFoundException();
      }

      return await this.findOne(id);
    } catch (error) {
      throw new HttpException(
        error?.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async softDelete(id: number) {
    try {
      const { affected } = await this.houseRepository.softDelete(id);

      if (affected === 0) {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new HttpException(
        error?.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
