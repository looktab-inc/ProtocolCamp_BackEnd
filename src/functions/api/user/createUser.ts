import { Response, Request } from 'express';
import * as sol3 from '@solana/web3.js';
import * as bs58 from 'bs58';
import { createRecord } from '../../../../utils/queryModules';

export async function createUser(req: Request, res: Response) {
  const { user_id } = req.body;

  const newKeyPair = sol3.Keypair.generate();
  const pubKey = newKeyPair.publicKey.toBase58();
  const secKey = bs58.encode(newKeyPair.secretKey);

  try {
    const createRecRes = await createRecord({
      table: 'user',
      data: {
        user_id,
        secret_key: secKey,
        public_key: pubKey,
        email: user_id,
      },
    });
    console.log(createRecRes);
  } catch (e) {
    console.log('error');
  }

  if (pubKey && secKey)
    return res.send({
      user_id,
      pubKey,
    });
}
