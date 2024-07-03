const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listTopics() {
  const topics = await prisma.topic.findMany();
  console.log(topics);
}

listTopics()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
