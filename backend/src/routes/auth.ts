import { Router } from 'express';
import jwt from 'jsonwebtoken';
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
    // DUMMY LOGIN MODE: Accept any credentials for testing (bypasses validation)
    // Set DUMMY_AUTH=false in .env to disable this
    const DUMMY_MODE = process.env.DUMMY_AUTH !== 'false'; // Default to true for testing
    if (DUMMY_MODE) {
      const { email = '', password = '' } = req.body;
      // Accept any email/password, even empty ones
      console.log('[DUMMY LOGIN] Bypassing authentication for:', email || 'any email');
      // Determine role from email or default to MSME
      let role: 'MSME' | 'INVESTOR' | 'ADMIN' = 'MSME';
      if (email.toLowerCase().includes('investor')) role = 'INVESTOR';
      if (email.toLowerCase().includes('admin')) role = 'ADMIN';
      
      const payload = { id: 'dummy-' + Date.now(), role };
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '2h' });
      return res.json({ token, user: payload });
    }

    // Normal validation and login flow
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

