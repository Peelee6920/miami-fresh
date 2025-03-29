import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('Mateo!2025', 12);

    // Create the admin user
    const admin = await prisma.user.create({
      data: {
        email: 'admin@miamifresh.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('Admin user created successfully:', admin.email);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser(); 