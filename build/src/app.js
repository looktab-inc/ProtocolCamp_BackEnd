"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./router/api"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Welcome to express server based typescript!');
});
app.use('/api', api_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
});
