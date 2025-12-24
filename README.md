## InvoSure – AI + Blockchain Invoice Financing Platform

Enterprise-grade scaffold with React/Vite frontend and Node.js/TypeScript backend. Includes JWT auth, role-based access, invoice tokenization flow, AI risk scoring stub, blockchain client stub, and auditable reports endpoints.

### Project Structure
- `frontend/` – React + TypeScript + Vite + Tailwind (dark institutional theme), Zustand + React Query, Recharts, Framer Motion.
- `backend/` – Node.js + TypeScript + Express, Prisma, PostgreSQL, MongoDB (logs), JWT auth, Multer uploads, ethers.js blockchain stub, PDF/CSV report placeholders.
- `smart-contracts/` – Sample Solidity contract for invoice tokenization.

### Prerequisites
- Node.js 18+
- npm or pnpm
- PostgreSQL & MongoDB instances
- (Optional) Hardhat-compatible chain (e.g., Anvil/Polygon testnet)

### Quick Start
```bash
# install frontend and backend deps
cd backend && npm install
cd ../frontend && npm install

# env setup
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# run backend
cd backend && npm run dev

# run frontend
cd frontend && npm run dev
```

### Backend Env (.env)
- `PORT=4000`
- `DATABASE_URL="postgresql://user:pass@localhost:5432/invosure"`
- `MONGO_URL="mongodb://localhost:27017/invosure_logs"`
- `JWT_SECRET="super-secure-secret"`
- `IPFS_ENDPOINT="https://ipfs.mock/api"`
- `CHAIN_RPC="http://localhost:8545"`
- `CHAIN_PRIVATE_KEY="0x..."` (hot wallet for demo; use vault in prod)
- `REPORT_SIGNING_KEY="demo-signing-key"`
- `ALLOW_ORIGIN="http://localhost:5173"`

### Frontend Env (.env)
- `VITE_API_BASE_URL="http://localhost:4000/api"`
- `VITE_IPFS_GATEWAY="https://ipfs.io/ipfs"`

### Security Notes
- Never commit real secrets.
- Use HTTPS, set secure/HTTPOnly cookies in production.
- Offload private keys to HSM or managed signer.
- Enable rate limiting and audit logging (hooks provided).

### What’s Included
- Auth routes with role-based middleware.
- Invoice upload, AI risk scoring stub, tokenization trigger, funding flow.
- Reports endpoints (PDF/CSV stubs) with date-range validation.
- Blockchain client wrapper and Solidity contract sample.
- Frontend pages matching the product brief with dark, copper-accent theme.

### Next Steps
- Wire Prisma to your DB and run `npx prisma migrate dev`.
- Connect ethers provider to real testnet and deploy `InvoiceTokenization.sol`.
- Replace AI stub with your model API; log decisions to MongoDB.
- Harden uploads (virus scan, size/type limits) and enable CDN storage.

