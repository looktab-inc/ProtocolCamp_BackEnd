"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseMsg_1 = require("../../../../utils/responseMsg");
const mysql_1 = __importDefault(require("../../../../utils/mysql"));
const getStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address } = req.params;
    if (!address) {
        return res.status(400).send(responseMsg_1.responseMsg[400]);
    }
    // get store data by address
    const getStoreRes = yield (0, mysql_1.default)(`select * from Store where name='${address}'`);
    if (!getStoreRes)
        return res.status(500).send('Error');
    return res.send(getStoreRes);
});
exports.default = getStore;
