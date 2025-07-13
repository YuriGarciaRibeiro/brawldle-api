import { seedBrawlers } from './seeds/brawlers.seed';
import { seedGameStats } from './seeds/gamestats.seed';

async function main() {
  const errors: Error[] = [];

  // Seed Brawlers (Prisma)
  try {
    await seedBrawlers();
  } catch (e: any) {
    console.warn('⚠️ Brawlers seed failed:', e.message || e);
    errors.push(e);
  }

  // Seed GameStats (Mongoose)
  try {
    await seedGameStats();
  } catch (e: any) {
    console.warn('⚠️ GameStats seed failed:', e.message || e);
    errors.push(e);
  }

  if (errors.length > 0) {
    console.warn(`⚠️ ${errors.length} seed(s) terminaram com erro.`);
    process.exit(1);
  }

  console.log('✅ Todos os seeds foram processados com sucesso.');
}

main().catch((e) => {
  console.error('❌ Erro inesperado durante o seed:', e);
  process.exit(1);
});
