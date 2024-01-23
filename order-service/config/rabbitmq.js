const amqp = require("amqplib");
const { orderModel } = require("../model/order");
let channel;
const connectToChannel = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    return await connection.createChannel();
  } catch (error) {
    return console.log("can not connect to channel in rabbitmq", error);
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
    await returnChannel();
    await channel.assertQueue(queueName);
    return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  } catch (error) {
    console.log(error);
  }
};

const createOrderwithQueue = async (queueName) => {
  await createQueue(queueName);
  await channel.consume(queueName, async (message) => {
    if (message.content) {
      const { products, userEmail } = JSON.parse(message.content.toString());
      // Calculate the total money of the products
      const totalPrice = products
        .map((p) => +p.price)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      const newOrder = await orderModel.create({
        products,
        userEmail,
        totalPrice,
      });
      // confirm message
      channel.ack(message);
      await pushToQueue("PRODUCT", newOrder);
    }
  });
};

module.exports = {
  pushToQueue,
  returnChannel,
  connectToChannel,
  createQueue,
  createOrderwithQueue,
};
