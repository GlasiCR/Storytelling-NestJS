import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { Roles } from '../auth/decorators/roleDecorator';
import { User_Role } from '../../enums/user_roles.enum';
import { AuthGuard } from '../auth/guards/authGuards';
import { RoleGuard } from '../auth/guards/rolesGuards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BuyHouseDto } from './dto/buy-house.dto';
@ApiTags('House')
@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}
  //Os guards que criamos para administrar autorização de acesso: AuthGuards e RoleGuards,
  //serão aplicadas na camada de Controller.
  //Atenção a ordem, pois isso importa. O caminho é de baixo para cima.
  //Dando uma pincelada sobre o @UseGuards(), ele sinaliza as rotas que não são públicas
  //--------------------------------------------------------------
  //3º - Por fim, agora que já temos as informações do usuário que está logado, o perfil dele,
  //podemos dizer qual é o perfil que tem acesso
  @Roles([User_Role.seller])
  //2º - Ao passarmos o RoleGuard no decorator do UseGuard(), estamos indicando que esta é uma
  //rota com acesso restrito de perfil
  @UseGuards(RoleGuard)
  //1º - Ao passarmos o AuthGuard no decorator do UseGuard(), estamos indicando que esta é uma
  //rota que para acessar requer um usuário autenticado (isso eu disse lá no arquivo AuthGuard)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createHouseDto: CreateHouseDto) {
    return this.housesService.create(createHouseDto);
  }

  @Roles([User_Role.buyer])
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post(':id')
  buyHouse(@Param('id') id: string, @Body() buyHouseDto: BuyHouseDto) {
    return this.housesService.buyHouse(+id, buyHouseDto);
  }

  @Get()
  findAll() {
    return this.housesService.findAll();
  }
  @Roles([User_Role.seller])
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.housesService.findOne(+id);
  }
  @Roles([User_Role.seller])
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.housesService.update(+id, updateHouseDto);
  }

  @Delete(':id')
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.housesService.softDelete(+id);
  }
}
