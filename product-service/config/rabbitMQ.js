const amqp = require("amqplib");
let channel;
const connectToChannel = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    return await connection.createChannel();
  } catch (error) {
    return console.log("can not connect to channel in rabbitmq");
  }
};

const returnChannel = async () => {
  if (!channel) {
    channel = await connectToChannel();
  }
  return channel;
};

const createQueue = async (queueName) => {
  const channel = await returnChannel();
  await channel.assertQueue(queueName);
  return channel;
};

const pushToQueue = async (queueName, data) => {
  try {
    await channel.assertQueue(queueName);
    return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
    pushToQueue,
    returnChannel,
    createQueue,
    connectToChannel
} 