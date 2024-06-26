import { NextFunction, Request, Response } from 'express';
import { Blockchain } from '../blockchain';
// import {sockets } from '../peers';

const blockchain = new Blockchain();

const serverHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'server running ok'
    });
};

const blocksStatus = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(blockchain.chain);
};

const mineBlock = (req: Request, res: Response, next: NextFunction) => {
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    return res.status(200).json({ data: block });
};

const peersGet = (req: Request, res: Response, next: NextFunction) => {

}
export default { serverHealthCheck, blocksStatus, mineBlock };  
