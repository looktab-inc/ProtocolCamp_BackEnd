"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const api_1 = __importDefault(require("./router/api"));
const apikeyCheck_1 = __importDefault(require("../utils/apikeyCheck"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Authorization (api key from .env)
app.use((req, res, next) => {
    if (!req.headers['content-type'] ||
        req.headers['content-type'] !== 'application/json')
        return res.status(400).send('Bad Request');
    if ((0, apikeyCheck_1.default)(req)) {
        return res.status(401).send('Unauthorized');
    }
    else
        next();
});
app.get('/', (req, res) => {
    res.send('TINJI API SERVER');
});
// API Router
app.use('/api', api_1.default);
// Run
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
});
