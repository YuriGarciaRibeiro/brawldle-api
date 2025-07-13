import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GameStatsService } from '../service/gamestats.service';
import { CreateGameStatDto } from '../dto/create-gamestat.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetGameStatDto } from '../dto/get-gamestat.dto';

@ApiTags("Game Stats")
@Controller('game-stats')
export class GameStatsController {
  constructor(private readonly service: GameStatsService) {}

  @Post()
  @ApiOkResponse({
    description: "Creates a new game stat",
    type: CreateGameStatDto,
  })
  async create(@Body() dto: CreateGameStatDto) {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({
    description: "Returns all game stats",
    type: [GetGameStatDto],
  })
  async findAll() {
    const gameStats = await this.service.findAll();
    const gameStatDtos = gameStats.map(stat => Object.assign(new GetGameStatDto(), stat));
    return gameStatDtos;
  }

  @Get('user/:userId')
  @ApiOkResponse({
    description: "Returns game stats for a specific user",
    type: [GetGameStatDto],
  })
  async findByUser(@Param('userId') userId: string) {
    const gameStats = await this.service.findByUser(userId);
    const gameStatDtos = gameStats.map(stat => Object.assign(new GetGameStatDto(), stat));
    return gameStatDtos;
  }

  @Get('user/:userId/streak')
  @ApiOkResponse({
    description: "Returns the current streak of a user",
    type: Number,
  })
  async userStreak(@Param('userId') userId: string) {
    return await this.service.userStreak(userId);
  }
}
