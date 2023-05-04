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
const express_1 = __importDefault(require("express"));
const postStore_1 = __importDefault(require("../../functions/api/store/postStore"));
const getStore_1 = __importDefault(require("../../functions/api/store/getStore"));
const patchStore_1 = __importDefault(require("../../functions/api/store/patchStore"));
const router = express_1.default.Router();
router.get('/:address', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, getStore_1.default)(req, res);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, postStore_1.default)(req, res);
}));
router.patch('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, patchStore_1.default)(req, res);
}));
exports.default = router;
