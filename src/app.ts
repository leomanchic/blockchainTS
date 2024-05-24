
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import logging from './config/logging';
import config from './config/config';
import routes from './routes';
import P2PServer from './peers';


const NAMESPACE = 'Server';


const app = express();

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT']
    })
);

app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP -[${req.socket.remoteAddress}]`);

    res.on(`finish`, () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {

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