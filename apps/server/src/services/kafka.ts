import { Kafka, Producer } from "kafkajs";
import fs from "fs";
import prismaClient from "./prisma";
const kafkaBroker: string = process.env.KAFKA_BROKER || '';
const kafkaUsername: string = process.env.KAFKA_USERNAME || '';
const kafkaPassword: string = process.env.KAFKA_PASSWORD || '';

const kafka = new Kafka({
    brokers: [kafkaBroker],
    ssl : {
        ca : [fs.readFileSync(('./ca.pem')  , "utf8")]
    },
    sasl: {
        username : kafkaUsername, 
        password : kafkaPassword,
        mechanism : "plain"
    }

});

let producer: null | Producer = null;

export async function createProducer() {
    if (producer) return producer;

    const _producer = kafka.producer();
    await _producer.connect();
    producer = _producer;
    return producer;
}



export async function startMessageConsumer() {
    console.log("CONSUMER IS RUNNING ")
    const consumer = kafka.consumer({groupId : "default"});
    await consumer.connect();
    await consumer.subscribe({topic : "MESSAGE" , fromBeginning : true});

    await consumer.run({
        autoCommit :true,
        eachMessage : async ({message, pause }) =>{
            if(!message.value) return ;
            console.log(`New message received`);
            try{
                await prismaClient.message.create({
                    data : {
                        text : message.value.toString(),
                    },
                });
            }
            catch(e){
                console.log(`something is wrong ${e}`);
                pause();
                setTimeout(() =>{
                    consumer.resume([{topic : "MESSAGE"}]);
                } ,60*1000); 
            }

        }
    })
}

export async function produceMessage(message : string){
    const producer = await createProducer();
    await producer.send({
        messages: [{ key: `message-${Date.now()}`, value: message }],
        topic: "MESSAGE"
    });
    return true;
}




export default kafka;
