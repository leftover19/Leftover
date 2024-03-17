import { Server } from "socket.io";
import { Redis } from "ioredis";

const pub = new Redis({
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    port: 15356
});

const sub = new Redis(
    {
        host: process.env.REDIS_HOST,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
        port: 15356
    }
);

class SocketService {
    private _io: Server;

    constructor() {
        console.log("Init Socket Service...");
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            },
        });
        // Subscribe to Redis
        sub.subscribe("MESSAGE")
    }

    public initListeners() {
        const io = this.io;
        console.log("Init Socket Listeners...");

        io.on("connect", (socket) => {
            console.log(`New Socket Connected`, socket.id);
            socket.on("event:message", async ({ message }: { message: string }) => {
                console.log("New Message Rec.", message);
                // Publish message to Redis
                await pub.publish('MESSAGE', JSON.stringify({ message }));
            });
        });

        sub.on('message', (channel, message) => {
            if (channel === 'MESSAGE') {
                console.log('new Message from redis', message);
                io.emit('message', message);
            }
        })

    }

    get io() {
        return this._io;
    }
}

export default SocketService;
