import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Check if test data already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: 'admin@test.com' },
  });

  if (existingUser) {
    console.log('Test data already exists');
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 12);

  // Create test organization with admin user
  const user = await prisma.user.create({
    data: {
      email: 'admin@test.com',
      password: hashedPassword,
      role: 'ADMIN',
      organization: {
        create: {
          name: 'Test Organization',
        },
      },
    },
    include: {
      organization: true,
    },
  });

  console.log('Created test organization and admin user:');
  console.log('Email: admin@test.com');
  console.log('Password: password123');
  console.log('Organization:', user.organization?.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
