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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftAmount = void 0;
const borsh = __importStar(require("@project-serum/borsh"));
class NftAmount {
  constructor(fields) {
    this.total = fields.total;
    this.remained = fields.remained;
  }
  static layout(property) {
    return borsh.struct([borsh.u16("total"), borsh.u16("remained")], property);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj) {
    return new NftAmount({
      total: obj.total,
      remained: obj.remained,
    });
  }
  static toEncodable(fields) {
    return {
      total: fields.total,
      remained: fields.remained,
    };
  }
  toJSON() {
    return {
      total: this.total,
      remained: this.remained,
    };
  }
  static fromJSON(obj) {
    return new NftAmount({
      total: obj.total,
      remained: obj.remained,
    });
  }
  toEncodable() {
    return NftAmount.toEncodable(this);
  }
}
exports.NftAmount = NftAmount;
//# sourceMappingURL=NftAmount.js.map
