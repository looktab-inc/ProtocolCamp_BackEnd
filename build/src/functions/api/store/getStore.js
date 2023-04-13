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
Object.defineProperty(exports, "__esModule", { value: true });
const responseMsg_1 = require("../../../../utils/responseMsg");
const getStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address } = req.params;
    if (!address) {
        return res.status(400).send(responseMsg_1.responseMsg[400]);
    }
    // get store data by address
    return res.send();
});
exports.default = getStore;
