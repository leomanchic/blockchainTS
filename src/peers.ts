import WebSocket from 'ws';

class P2PServer {
    private sockets: WebSocket[];
    private p2pPort: number;

    constructor(p2pPort: number) {
        this.sockets = [];
        this.p2pPort = p2pPort;
        this.initP2PServer();
    }

    private initP2PServer(): void {
        const server = new WebSocket.Server({ port: this.p2pPort });
        server.on('connection', (ws: WebSocket) => this.initConnection(ws));
        console.log(`listening websocket p2p port on: ${this.p2pPort}`);
    }

    private initConnection(ws: WebSocket): void {
        this.sockets.push(ws);
        this.initMessageHandler(ws);
        this.initErrorHandler(ws);
        this.write(ws, this.queryChainLengthMsg());
    }

    private initMessageHandler(ws: WebSocket): void {
        // Implement the message handler logic here
    }

    private initErrorHandler(ws: WebSocket): void {
        const closeConnection = (): void => {
            console.log(`connection failed to peer: ${ws.url}`);
            this.sockets = this.sockets.filter(s => s !== ws);
        };
        ws.on('close', closeConnection);
        ws.on('error', closeConnection);
    }

    public connectToPeers(newPeers: string[]): void {
        newPeers.forEach((peer: string) => {
            const ws = new WebSocket(peer);
            ws.on('open', () => this.initConnection(ws));
            ws.on('error', () => {
                console.log('connection failed');
            });
        });
    }

    private queryChainLengthMsg(): any {
        // Implement the queryChainLengthMsg logic here
    }

    private write(ws: WebSocket, message: any): void {
        ws.send(JSON.stringify(message));
    }
}

export default P2PServer;