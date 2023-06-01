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
const postCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, lat, lng, address, start_time, end_time, distance, nft_count, images, } = req.body;
    if (!title ||
        !description ||
        !lat ||
        !lng ||
        !address ||
        !start_time ||
        !end_time ||
        !distance ||
        !nft_count ||
        !images) {
        return res.status(400).send(responseMsg_1.responseMsg[400]);
    }
    return res.send('GET /api/campaign');
});
exports.default = postCampaign;
