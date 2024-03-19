import http from 'http'
import SocketService from './services/socket';
import { startMessageConsumer } from './services/kafka';
async function init() {
    startMessageConsumer();
    const socketService = new SocketService();
    const httpServer = http.createServer();

    httpServer.on('request', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }

        // Proceed to your regular request handling
        // ...
    });
    const PORT = process.env.PORT ? process.env.PORT : 8000;

    socketService.io.attach(httpServer);

    httpServer.listen(PORT, () => console.log(`Http Server Up & Running at PORT:${PORT}`));
    socketService.initListeners();

}

init();
