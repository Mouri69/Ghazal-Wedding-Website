import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const messages = await prisma.message.findMany();
    console.log("Database connected successfully! Messages count:", messages.length);
  } catch (e) {
    console.error("Database connection failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
