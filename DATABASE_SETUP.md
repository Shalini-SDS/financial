# Database Setup Guide

This project uses **two databases**:

1. **PostgreSQL** (via Prisma) - Main application data (users, invoices, investments)
2. **MongoDB** (via Mongoose) - Risk analysis logs

## Quick Setup Options

### Option 1: Cloud Services (Easiest for Hackathon)

#### MongoDB Atlas (Free Tier)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account and cluster
3. Create a database user
4. Get your connection string
5. Update `MONGO_URL` in `backend/.env`:
   ```
   MONGO_URL="mongodb+srv://username:password@cluster.mongodb.net/invosure_logs?retryWrites=true&w=majority"
   ```

#### PostgreSQL Cloud (Free Options)
- **Supabase**: https://supabase.com (free tier available)
- **Neon**: https://neon.tech (free tier available)
- **Railway**: https://railway.app (free tier available)

After creating a PostgreSQL database, update `DATABASE_URL` in `backend/.env`:
```
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
```

### Option 2: Local Installation

#### Install PostgreSQL
- **Windows**: Download from https://www.postgresql.org/download/windows/
- **Mac**: `brew install postgresql@14`
- **Linux**: `sudo apt-get install postgresql`

Create database:
```bash
createdb invosure
# Or using psql:
psql -U postgres
CREATE DATABASE invosure;
```

#### Install MongoDB
- **Windows**: Download from https://www.mongodb.com/try/download/community
- **Mac**: `brew install mongodb-community`
- **Linux**: `sudo apt-get install mongodb`

Start MongoDB:
```bash
# Windows: MongoDB should start as a service
# Mac/Linux:
mongod
```

## Setup Steps

1. **Configure `.env` file** (already created in `backend/.env`)

2. **Generate Prisma Client**:
   ```bash
   cd backend
   npx prisma generate
   ```

3. **Run Database Migrations**:
   ```bash
   cd backend
   npx prisma migrate dev --name init
   ```

4. **Verify MongoDB Connection**:
   The MongoDB connection is lazy-loaded (connects when needed), but you can test it by starting the server and making a request that triggers risk analysis.

## Testing Connections

### Test PostgreSQL:
```bash
cd backend
npx prisma studio
# Opens a GUI to view your database
```

### Test MongoDB:
The connection will be tested automatically when you:
- Upload an invoice
- Trigger AI risk analysis
- The `storeRiskLog` function is called

## Troubleshooting

### PostgreSQL Connection Issues
- Check if PostgreSQL is running: `pg_isready`
- Verify credentials in `.env`
- Check if database exists: `psql -l`

### MongoDB Connection Issues
- Check if MongoDB is running: `mongosh` (or `mongo` on older versions)
- For Atlas: Check IP whitelist (add `0.0.0.0/0` for testing)
- Verify connection string format

## For Demo/Development Only

If you just need to get started quickly without setting up databases:

1. **Use SQLite instead of PostgreSQL** (modify `schema.prisma`):
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```

2. **Skip MongoDB** (comment out MongoDB calls in code) - risk logs won't be stored but app will work

3. **Use Docker** (if you have it):
   ```bash
   docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres
   docker run -d -p 27017:27017 mongo
   ```



