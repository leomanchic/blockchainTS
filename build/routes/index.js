"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../controllers/index"));
const router = express_1.default.Router();
router.get('/check', index_1.default.serverHealthCheck);
router.get('/blocks', index_1.default.blocksStatus);
router.post('/mine', index_1.default.mineBlock);
module.exports = router;
