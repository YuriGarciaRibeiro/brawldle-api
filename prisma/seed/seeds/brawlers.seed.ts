import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

export async function seedBrawlers() {
  try {
    const existing = await prisma.brawler.count();
    if (existing > 0) {
        console.log(`🛑 Seed cancelado: já existem ${existing} brawlers no banco.`);
        return Promise.resolve();
    }

    console.log("🌱 Seeding brawlers...");

    const filePath = path.resolve(__dirname, '../../../brawlers.json'); // ajuste se necessário
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const brawlers = JSON.parse(jsonData) as Array<{
        name: string;
        rarity: string;
        role: string;
        gender: string;
        releaseYear: number;
        imageUrl: string;
    }>;

    for (const brawler of brawlers) {
        await prisma.brawler.create({
        data: brawler,
        });
    }

    console.log(`✅ Seeded ${brawlers.length} brawlers.`);
  } catch (error) {
    console.error('❌ Erro ao seedar brawlers:', error);
    throw error;
  }
  finally {
    await prisma.$disconnect();
  }
}
