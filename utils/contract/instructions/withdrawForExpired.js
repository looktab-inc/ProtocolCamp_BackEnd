"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawForExpired = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function withdrawForExpired(accounts) {
  const keys = [
    { pubkey: accounts.bankAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.pdaAuth, isSigner: false, isWritable: false },
    { pubkey: accounts.solVault, isSigner: false, isWritable: true },
    { pubkey: accounts.bankAuth, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.clientAccount, isSigner: false, isWritable: true },
  ];
  const identifier = Buffer.from([90, 123, 129, 146, 41, 253, 69, 183]);
  const data = identifier;
  const ix = new web3_js_1.TransactionInstruction({
    keys,
    programId: programId_1.PROGRAM_ID,
    data,
  });
  return ix;
}
exports.withdrawForExpired = withdrawForExpired;
//# sourceMappingURL=withdrawForExpired.js.map
