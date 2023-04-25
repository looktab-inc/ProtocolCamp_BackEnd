import * as sol3 from '@solana/web3.js';
import { Request, Response } from 'express';
import solanaClusterRPCEndpoints from '../../../../utils/solanaClusterRPCEndpoints';

const web3 = new sol3.Connection(solanaClusterRPCEndpoints.devnet);

export async function getBalance(req: Request, res: Response) {
  try {
    const pubkey = req.params.pubkey;
    if (!pubkey) return res.status(400).send('Bad Request');

    const pukey = new sol3.PublicKey(pubkey);
    const bal = await web3.getBalance(pukey);
    return res.send({ balnace: bal });
  } catch (e) {
    return res
      .status(400)
      .send({ status: 'Bad Request', message: 'INVALID Public Key' });
  }
}
