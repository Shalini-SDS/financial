import { Router } from 'express';
import { createUser, loginUser } from '../services/authService';
import { loginSchema, signupSchema } from '../utils/validation';

export const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', details: parsed.error.errors });
    }
    const { email, password, role } = parsed.data;
    const user = await createUser(email, password, role);
    res.json({ id: user.id, email: user.email, role: user.role });
  } catch (error: any) {
    if (error.message === 'User exists') {
      return res.status(409).json({ error: 'User already exists' });
    }
    // Check for database connection errors
    if (error.code === 'P1001' || error.message?.includes("Can't reach database")) {
      console.error('[AUTH SIGNUP ERROR] Database connection failed:', error.message);
      return res.status(503).json({ 
        error: 'Database connection failed. Please check your PostgreSQL setup.',
        details: 'See DATABASE_SETUP.md for instructions'
      });
    }
    console.error('[AUTH SIGNUP ERROR]', error);
    res.status(500).json({ error: error.message || 'Failed to create user' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', details: parsed.error.errors });
    }
    const { email, password } = parsed.data;
    const session = await loginUser(email, password);
    res.json(session);
  } catch (error: any) {
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Check for database connection errors
    if (error.code === 'P1001' || error.message?.includes("Can't reach database")) {
      console.error('[AUTH LOGIN ERROR] Database connection failed:', error.message);
      return res.status(503).json({ 
        error: 'Database connection failed. Please check your PostgreSQL setup.',
        details: 'See DATABASE_SETUP.md for instructions'
      });
    }
    console.error('[AUTH LOGIN ERROR]', error);
    res.status(500).json({ error: error.message || 'Failed to login' });
  }
});

