"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
const web3_js_1 = require("@solana/web3.js");
const borsh = __importStar(require("@project-serum/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class BankAccount {
  constructor(fields) {
    this.bankAuth = fields.bankAuth;
    this.authBump = fields.authBump;
    this.solVaultBump = fields.solVaultBump;
    this.nftAmount = new types.NftAmount(Object.assign({}, fields.nftAmount));
  }
  static fetch(c, address) {
    return __awaiter(this, void 0, void 0, function* () {
      const info = yield c.getAccountInfo(address);
      if (info === null) {
        return null;
      }
      if (!info.owner.equals(programId_1.PROGRAM_ID)) {
        throw new Error("account doesn't belong to this program");
      }
      return this.decode(info.data);
    });
  }
  static fetchMultiple(c, addresses) {
    return __awaiter(this, void 0, void 0, function* () {
      const infos = yield c.getMultipleAccountsInfo(addresses);
      return infos.map((info) => {
        if (info === null) {
          return null;
        }
        if (!info.owner.equals(programId_1.PROGRAM_ID)) {
          throw new Error("account doesn't belong to this program");
        }
        return this.decode(info.data);
      });
    });
  }
  static decode(data) {
    if (!data.slice(0, 8).equals(BankAccount.discriminator)) {
      throw new Error("invalid account discriminator");
    }
    const dec = BankAccount.layout.decode(data.slice(8));
    return new BankAccount({
      bankAuth: dec.bankAuth,
      authBump: dec.authBump,
      solVaultBump: dec.solVaultBump,
      nftAmount: types.NftAmount.fromDecoded(dec.nftAmount),
    });
  }
  toJSON() {
    return {
      bankAuth: this.bankAuth.toString(),
      authBump: this.authBump,
      solVaultBump: this.solVaultBump,
      nftAmount: this.nftAmount.toJSON(),
    };
  }
  static fromJSON(obj) {
    return new BankAccount({
      bankAuth: new web3_js_1.PublicKey(obj.bankAuth),
      authBump: obj.authBump,
      solVaultBump: obj.solVaultBump,
      nftAmount: types.NftAmount.fromJSON(obj.nftAmount),
    });
  }
}
exports.BankAccount = BankAccount;
BankAccount.discriminator = Buffer.from([43, 1, 157, 150, 152, 181, 247, 246]);
BankAccount.layout = borsh.struct([
  borsh.publicKey("bankAuth"),
  borsh.u8("authBump"),
  borsh.option(borsh.u8(), "solVaultBump"),
  types.NftAmount.layout("nftAmount"),
]);
//# sourceMappingURL=BankAccount.js.map
