import { Module } from '@nestjs/common';
import { HousesService } from './houses.service';
import { HousesController } from './houses.controller';
import { HouseEntity } from '../../database/entities/houses.entity';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HouseEntity]), UsersModule],
  controllers: [HousesController],
  providers: [HousesService],
})
export class HousesModule {}
