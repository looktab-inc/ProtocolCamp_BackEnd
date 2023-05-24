"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawForVerified = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function withdrawForVerified(accounts) {
  const keys = [
    { pubkey: accounts.bankAccount, isSigner: false, isWritable: false },
    { pubkey: accounts.pdaAuth, isSigner: false, isWritable: false },
    { pubkey: accounts.solVault, isSigner: false, isWritable: true },
    { pubkey: accounts.bankAuth, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.clientAccount, isSigner: false, isWritable: true },
  ];
  const identifier = Buffer.from([175, 141, 69, 185, 11, 217, 46, 51]);
  const data = identifier;
  const ix = new web3_js_1.TransactionInstruction({
    keys,
    programId: programId_1.PROGRAM_ID,
    data,
  });
  return ix;
}
exports.withdrawForVerified = withdrawForVerified;
//# sourceMappingURL=withdrawForVerified.js.map
