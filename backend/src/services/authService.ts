import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AuthUser } from '../middleware/auth';

const prisma = new PrismaClient();

export const createUser = async (email: string, password: string, role: AuthUser['role']) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('User exists');
  const hashed = await bcrypt.hash(password, 10);
  return prisma.user.create({ data: { email, password: hashed, role } });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error('Invalid credentials');
  const payload: AuthUser = { id: user.id, role: user.role as AuthUser['role'] };
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '2h' });
  return { token, user: payload };
};

