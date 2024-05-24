"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SERVER_HOSTNAME = process.env.HOSTNAME || `localhost`;
const SERVER_PORT = process.env.SERVER_PORT || 1338;
const P2P_PORT = 6001;
const INITIALPEERS = process.env.PEERS ? process.env.PEERS.split(',') : [];
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
const P2P = {
    hostname: SERVER_HOSTNAME,
    port: P2P_PORT
};
const config = {
    server: SERVER,
    p2p: P2P
};
exports.default = config;
