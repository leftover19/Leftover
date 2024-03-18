import http from 'http'
import SocketService from './services/socket';
import { startMessageConsumer } from './services/kafka';
async function init() {
    startMessageConsumer();
    const socketService = new SocketService();
    const httpServer = http.createServer();

    httpServer.on('request', (req, res) => {
        // Allow requests only from the specified origin
        res.setHeader('Access-Control-Allow-Origin', 'https://chatappserver-6y2lnjy60-leftovers-projects.vercel.app');

        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }
    });
    const PORT = process.env.PORT ? process.env.PORT : 8000;

    socketService.io.attach(httpServer);

    httpServer.listen(PORT, () => console.log(`Http Server Up & Running at PORT:${PORT}`));
    socketService.initListeners();

}

init();
