import fs from 'fs';

export const pinToIpfs = async (filePath: string) => {
  // placeholder for IPFS; in production, stream to pinning service.
  if (!fs.existsSync(filePath)) throw new Error('File missing');
  return `ipfs://mock/${Buffer.from(filePath).toString('hex')}`;
};

