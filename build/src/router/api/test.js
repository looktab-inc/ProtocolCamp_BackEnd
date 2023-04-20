"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('This is /api/test Root');
});
router.get('/test', (req, res) => {
    res.send('You requested /api/test/test');
});
router.get('/test2', (req, res) => {
    res.send('You resquested /api/test/test2');
});
exports.default = router;
