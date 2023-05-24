"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function initialize(accounts) {
  const keys = [
    { pubkey: accounts.bankAccount, isSigner: true, isWritable: true },
    { pubkey: accounts.pdaAuth, isSigner: false, isWritable: false },
    { pubkey: accounts.bankAuth, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([175, 175, 109, 31, 13, 152, 155, 237]);
  const data = identifier;
  const ix = new web3_js_1.TransactionInstruction({
    keys,
    programId: programId_1.PROGRAM_ID,
    data,
  });
  return ix;
}
exports.initialize = initialize;
//# sourceMappingURL=initialize.js.map
