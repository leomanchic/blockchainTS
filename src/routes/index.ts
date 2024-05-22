import express from 'express';
import controller from '../controllers/index';

const router = express.Router();

router.get('/check', controller.serverHealthCheck);
router.get('/blocks', controller.blocksStatus);
router.post('/mine', controller.mineBlock);
// router.get('/peers', (req, res) => {
//     res.send(sockets.map(s => s._socket.remoteAddress + ':' +
//     s._socket.remotePort));
//     });
//     app.post('/addPeer', (req, res) => {
//     connectToPeers([req.body.peer]);
//     res.send();
//     });
//     app.listen(ht
export = router;