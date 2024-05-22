"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
const routes_1 = __importDefault(require("./routes"));
const NAMESPACE = 'Server';
//get the port from the user or set the default port
// const HTTP_PORT = process.env.HTTP_PORT || 3001;
//create a new app
const app = (0, express_1.default)();
//use cors middleware
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT']
}));
//logging the request
app.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP -[${req.socket.remoteAddress}]`);
    res.on(`finish`, () => {
        logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});
// parse the request
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// rules of API
app.use((req, res, next) => {
    // remove in production
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});
// Routes
app.use('/api', routes_1.default);
// Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});
const httpServer = http_1.default.createServer(app);
httpServer.listen(config_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server is running ${config_1.default.server.hostname}:${config_1.default.server.port}`));
