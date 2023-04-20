"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_1 = __importDefault(require("./api/test"));
const store_1 = __importDefault(require("./api/store"));
const campaign_1 = __importDefault(require("./api/campaign"));
const patchNfts_1 = __importDefault(require("../functions/api/nfts/patchNfts"));
const router = express_1.default.Router();
// API root
router.get('/', (req, res) => {
    res.send('This is API Root');
});
// test routing
router.use('/test', test_1.default);
router.use('/store', store_1.default);
router.use('/campaign', campaign_1.default);
router.use('/nfts', patchNfts_1.default);
exports.default = router;
