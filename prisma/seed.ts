import { PrismaClient } from "@prisma/client";
import argon2id from "argon2";

const prisma = new PrismaClient();
const basePassword = process.env.BASE_PASSWORD!;

async function main() {
  await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      username: "admin",
      password: await argon2id.hash(basePassword),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
