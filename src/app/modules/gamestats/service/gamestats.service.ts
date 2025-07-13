import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GameStat, GameStatDocument, GameType } from '../schemas/gamestat.schema';
import { Model } from 'mongoose';
import { CreateGameStatDto } from '../dto/create-gamestat.dto';
import { DailybrawlerService } from '../../dailybrawler/service/dailybrawler.service';

@Injectable()
export class GameStatsService {
  constructor(
    @InjectModel(GameStat.name) private gameStatModel: Model<GameStatDocument>,
    private readonly dailyBrawlerService: DailybrawlerService,
  ) {}

  async create(dto: CreateGameStatDto): Promise<GameStat> {
    const doc = new this.gameStatModel({
      ...dto,
      attemptCount : dto.attempts.length,
      dailyBrawler: dto.gameType == GameType.BrawlerDaily ? (await this.dailyBrawlerService.getTodayDailyBrawler()).brawler.name : undefined,
      playedAt: new Date()
    });
    return doc.save();
  }

  async findAll(): Promise<GameStat[]> {
    return this.gameStatModel.find().sort({ playedAt: -1 }).lean().exec();
  } 


  async findByUser(userId: string): Promise<GameStat[]> {
    return this.gameStatModel.find({ userId }).sort({ playedAt: -1 }).lean().exec();
  }

  async userStreak(userId: string): Promise<number> {
    const stats = await this.gameStatModel.find({ userId, won: true }).sort({ playedAt: -1 }).lean().exec();
    let streak = 0;

    for (const stat of stats) {
      if (stat.won) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }
}
