import http from 'http'
import SocketService from './services/socket';
import { startMessageConsumer } from './services/kafka';
async function init() {
    startMessageConsumer();
    const socketService = new SocketService();
    const httpServer = http.createServer((req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST , PUT , DELETE  , OPTIONS, GET');
        res.setHeader('Access-Control-Max-Age', 60 * 60 * 24 * 30);
    });


    const PORT = process.env.PORT ? process.env.PORT : 8000;

    socketService.io.attach(httpServer);

    httpServer.listen(PORT, () => console.log(`Http Server Up & Running at PORT:${PORT}`));
    socketService.initListeners();

}

init();
