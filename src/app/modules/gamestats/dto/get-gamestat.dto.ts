import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GameType } from '../schemas/gamestat.schema';

class AttemptDto {
  @IsString()
  guess: string;

  @IsString()
  result: string;
}

export class GetGameStatDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(GameType)
  gameType: GameType; 

  @IsOptional()
  @IsString()
  dailyBrawler?: string;

  @IsInt()
  @IsNotEmpty()
  attemptCount: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttemptDto)
  attempts: AttemptDto[];

  @IsBoolean()
  won: boolean;

  @IsOptional()
  @IsString()
  playedAt?: string;
}
