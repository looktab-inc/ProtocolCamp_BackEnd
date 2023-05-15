import { Response, Request } from 'express';
import * as sol3 from '@solana/web3.js';
import * as bs58 from 'bs58';
import { createRecord, findRecord } from '../../../../utils/queryModules';
import { generateCode } from '../../../../utils/generateUserCode';

export async function createUser(req: Request, res: Response) {
  const { email, username } = req.body;
  // exception handling : no params
  if (!email || !username) return res.status(400).send('Bad Request');

  const newKeyPair = sol3.Keypair.generate();
  const pubKey = newKeyPair.publicKey.toBase58();
  const secKey = bs58.encode(newKeyPair.secretKey);

  try {
    const getUserRes = await findRecord({
      table: 'Users',
      data: {
        email,
      },
    });
    if (getUserRes.length != 0) return res.send('user email exists');
  } catch (e) {
    return res.status(500).send('Internal Error');
  }

  try {
    const createRecRes = await createRecord({
      table: 'Users',
      data: {
        id: await generateCode(),
        secret_key: secKey,
        public_key: pubKey,
        email,
        username,
      },
    });

    if (pubKey && secKey)
      return res.status(201).send({
        user_id: createRecRes.id,
        username: createRecRes.username,
        email: createRecRes.email,
        pub_key: createRecRes.public_key,
      });
  } catch (e) {
    console.log('error');
  }
}
