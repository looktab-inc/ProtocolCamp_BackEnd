import * as sol3 from '@solana/web3.js';
import { Request, Response } from 'express';
import solanaClusterRPCEndpoints from '../../../../utils/solanaClusterRPCEndpoints';
import { findRecord } from '../../../../utils/queryModules';

const network = 'devnet';
const web3 = new sol3.Connection(solanaClusterRPCEndpoints[network]);

export async function getBalance(req: Request, res: Response) {
  try {
    // const pubkey =
    const user_id = req.params.user_id;
    if (!user_id) return res.status(400).send('Bad Request');

    const [getUserRes] = await findRecord({
      table: 'Users',
      data: { id: user_id },
    });

    // handling no email error
    if (!getUserRes)
      return res.status(404).send('No Matching User with email : ' + user_id);

    const pubkey = getUserRes.public_key;

    const solPubKey = new sol3.PublicKey(pubkey);
    const bal = await web3.getBalance(solPubKey);
    return res.send({ network, balnace: bal });
  } catch (e) {
    return res
      .status(400)
      .send({ status: 'Bad Request', message: 'INVALID Public Key' });
  }
}
