"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depositForNft = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function depositForNft(accounts) {
  const keys = [
    { pubkey: accounts.bankAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.pdaAuth, isSigner: false, isWritable: false },
    { pubkey: accounts.solVault, isSigner: false, isWritable: true },
    { pubkey: accounts.bankAuth, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([21, 22, 224, 16, 180, 120, 218, 47]);
  const data = identifier;
  const ix = new web3_js_1.TransactionInstruction({
    keys,
    programId: programId_1.PROGRAM_ID,
    data,
  });
  return ix;
}
exports.depositForNft = depositForNft;
//# sourceMappingURL=depositForNft.js.map
