const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const topics = await prisma.topic.findMany();
  console.log(topics);
  prisma.$disconnect();
}

main();
