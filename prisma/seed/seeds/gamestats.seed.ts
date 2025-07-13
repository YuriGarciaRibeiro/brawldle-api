import mongoose from 'mongoose';
import { GameStat, GameStatSchema, GameType } from '../../../src/app/modules/gamestats/schemas/gamestat.schema';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/brawldle';

const random = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const brawlerNames = [
  'Shelly', 'Colt', 'Jessie', 'Brock', 'Dynamike', 'Bo', 'Tick', '8-Bit', 'Emz',
  'El Primo', 'Barley', 'Poco', 'Rosa', 'Rico', 'Darryl', 'Penny', 'Carl', 'Jacky'
];

const resultEmojis = ['🟢', '🟡', '🔴'];

function generateAttempts(): { guess: string; result: string }[] {
  const numAttempts = Math.floor(Math.random() * 4) + 1; // 1–4 tentativas
  const attempts = [];

  for (let i = 0; i < numAttempts; i++) {
    const guess = random(brawlerNames);
    const result = `${random(resultEmojis)}${random(resultEmojis)}${random(resultEmojis)}`;
    attempts.push({ guess, result });
  }

  return attempts;
}

export async function seedGameStats() {
  await mongoose.connect(MONGO_URI);

  try{
    const GameStatModel = mongoose.models.GameStat || mongoose.model('GameStat', GameStatSchema);

    const existing = await GameStatModel.countDocuments();
    if (existing > 0) {
        console.log(`🛑 Seed cancelado: já existem ${existing} registros de GameStat.`);
        return Promise.resolve();;
    }

    console.log('🌱 Seeding 30 game stats...');

    const stats = Array.from({ length: 30 }).map((_, i) => {
        const attempts = generateAttempts();
        const won = Math.random() < 0.5;
        const daysAgo = Math.floor(Math.random() * 30);
        const stat = {
        userId: `user${(i % 5) + 1}`, // user1 a user5
        gameType: i % 2 === 0 ? GameType.BrawlerDaily : GameType.BrawlerEndless,
        dailyBrawler: i % 2 === 0 ? random(brawlerNames) : undefined,
        won,
        attempts,
        attemptCount: attempts.length,
        playedAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000), // dias aleatórios atrás
        }

        
        return stat;
    });


    await GameStatModel.insertMany(stats);

    console.log(`✅ Seeded ${stats.length} game stats.`);
  } catch (error) {
    console.error('❌ Erro ao seedar GameStats:', error);
    throw error;
  }
  finally {
    await mongoose.disconnect();
  }
}
