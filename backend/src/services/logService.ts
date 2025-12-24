import mongoose from 'mongoose';

const riskLogSchema = new mongoose.Schema({
  invoiceId: String,
  score: Number,
  band: String,
  explanation: String,
  createdAt: { type: Date, default: Date.now },
});

const RiskLog = mongoose.model('RiskLog', riskLogSchema);

let connected = false;
const connect = async () => {
  if (!connected) {
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/invosure_logs');
    connected = true;
  }
};

export const storeRiskLog = async (invoiceId: string, payload: any) => {
  await connect();
  await RiskLog.create({ invoiceId, ...payload });
};

