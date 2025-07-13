import { Controller, Get } from '@nestjs/common';
import { DailybrawlerService } from '../service/dailybrawler.service';
import {ApiTags } from '@nestjs/swagger';

@ApiTags('Daily Brawler')
@Controller('dailybrawler')
export class DailybrawlerController {
    constructor(
        private readonly dailyBrawlerService: DailybrawlerService,
    ) {}
}