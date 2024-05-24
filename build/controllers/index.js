"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("../blockchain");
// import {sockets } from '../peers';
const blockchain = new blockchain_1.Blockchain();
const serverHealthCheck = (req, res, next) => {
    return res.status(200).json({
        message: 'server running ok'
    });
};
const blocksStatus = (req, res, next) => {
    return res.status(200).json(blockchain.chain);
};
const mineBlock = (req, res, next) => {
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    return res.status(200).json({ data: block });
};
const peersGet = (req, res, next) => {
};
exports.default = { serverHealthCheck, blocksStatus, mineBlock };
