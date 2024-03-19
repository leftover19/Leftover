import http from 'http'
import express from 'express';
import cors from 'cors';
import SocketService from './services/socket';
import { startMessageConsumer } from './services/kafka';
async function init() {
    const app = express();

    app.use(cors());
    const httpServer = http.createServer(app);

    startMessageConsumer();
    const socketService = new SocketService();


    const PORT = process.env.PORT ? process.env.PORT : 8000;

    socketService.io.attach(httpServer);

    httpServer.listen(PORT, () => console.log(`Http Server Up & Running at PORT:${PORT}`));
    socketService.initListeners();
}

init();
