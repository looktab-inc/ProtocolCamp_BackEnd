import { findRecord } from './queryModules';

export async function generateCode(): Promise<string> {
  let code = '';
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (let i = 0; i < 6; i++) {
    code += possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    );
  }

  const findRes = await findRecord({ table: 'Users', data: { id: code } });
  if (findRes.length === 0) return code;
  else return await generateCode();
}
