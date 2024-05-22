
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import logging from './config/logging';
import config from './config/config';
import routes from './routes';
import P2PServer from './peers';


const NAMESPACE = 'Server';

//get the port from the user or set the default port
// const HTTP_PORT = process.env.HTTP_PORT || 3001;

//create a new app
const app = express();

//use cors middleware
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT']
    })
);

//logging the request
app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP -[${req.socket.remoteAddress}]`);

    res.on(`finish`, () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});

// parse the request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
app.use('/api', routes);

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));

const p2pPort = config.p2p.port; // Example P2P port, you might need to set this in your config
const p2pServer = new P2PServer(p2pPort);
        
// const p2pServer = http.createServer(app);
// p2pServer.listen(config.p2p.port, () => logging.info(NAMESPACE, `Server p2p is running ${config.p2p.hostname}:${config.p2p.port}`));