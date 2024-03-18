# Overview 
This is a monorepo for my projects.
Tree structure :

![tree sturucture](https://github.com/leftover19/Leftover/assets/113136731/08424079-11a5-4ff4-b6e0-6e775c4f3ff4)

# Scalable Chat Application 

Welcome to my Scalable Chat Application project! 

The server app utilizes Prisma, Kafka, Redis, and TypeScript, while the web app is built with Next.js and incorporates WebSockets via Socket.IO. 

Together, these components form a scalable chat application capable of handling multiple users concurrently.

## Architecture
This is the architecure of the project. 
![Architecture image](https://github.com/leftover19/Leftover/assets/113136731/41261662-bbc5-4dca-8adf-8c67dbec7bc2)
I designed this in obsidian. Still learning to draw these canvas. I'm no professional in making these designes but this is the best that I can do.

## Screenshots during development 
### Explanation : 
There are 3 servers running, on localhost 8000 , 8001 and 8002. 
And as you can see in the next image, there are two instances of frontend are open. Hence two socket ID are console logged `New Socket Connected <socketID>`

`New message from redis {..} ` is actually the SUB mechanism of Redis. It distributes the message to the published server.
(ps : left terminal, last few lines )

![Terminal](https://github.com/leftover19/Leftover/assets/113136731/7b8e10a3-c94a-48b3-ac1f-1cbc2bfce879)
### Explanation : 
From one of the frontend, Hii is sent which is seen in console before. 

![Frontend](https://github.com/leftover19/Leftover/assets/113136731/bdeaf052-8489-484d-9be0-434b080e04f0)
### Explanation : 
Via Redis Insights, we can the the message being published (pub mechanism)

![Redis Insights](https://github.com/leftover19/Leftover/assets/113136731/e05e2b7d-b87d-4c45-b29e-4e1e93260ae5)


## Environment Variables

For Redis, Kafka and Prisma environment variables create a `.env` file in server directory.
Variables are: 
### Redis Environment Variables
```env
REDIS_HOST=

REDIS_USERNAME=

REDIS_PASSWORD=

REDIS_PORT=15356
```

### Prisma Environment Variables
```env
DATABASE_URL=
```

### Kafka environment variables
``` env
KAFKA_BROKER=

KAFKA_USERNAME=

KAFKA_PASSWORD=

```
For Prisma : add `sslmode=requrire&sslcert=ca.pem`
where ca.pem is the ssl certificate.


For Kafka : place it's ca.pem certificate in server directory.
## Tech Stack

### Web
- **Framework**: Next.js
- **Real-time Communication**: Socket.io

### Server
- **Runtime Environment**: Node.js
- **Caching**: Redis
- **Messaging System**: KafkaJS
- **ORM (Object-Relational Mapping)**: Prisma
- **Language**: TypeScript

### Database
- **Relational Database**: PostgreSQL
- **Caching**: Redis

## License

[MIT](https://github.com/leftover19/Leftover/blob/main/LICENSE)


## Lessons Learned
    1. Learned how scalable systems are designed in real world. 

    2. How technologies like Kafak and Redis are solving the problem of rapidly streaming data. 
       I found Redis a very useful tool to scale system horizontally.

    3. Stateless and Statefull HTTP requests.

    4. The strictness of Typescript. Many error were there in the developement.

    5. Enhanced Googling skills. ChatGPT is proved to be useful in fixing Typescript error but not for development.

