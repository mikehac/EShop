import { RabbitMQConsumer, Message } from 'mqmanager-nestjs';
import * as dotenv from 'dotenv';
dotenv.config();

const runConsumer = async () => {
  const consumer = new RabbitMQConsumer(
    process.env.QueueName, // Queue name
    process.env.ExchangeName, // Exchange name
    process.env.ConnectionString, // RabbitMQ connection string
  );

  try {
    await consumer.connect();
    console.log('Consumer connected successfully.');
    console.log(`QueueName=${process.env.QueueName}`);
    console.log(`ExchangeName=${process.env.ExchangeName}`);
    console.log(`ConnectionString=${process.env.ConnectionString}`);

    // Define the message handler
    const messageHandler = async (message: Message) => {
      try {
        console.log('Received message:', message);
        // Simulate processing
        if (message.id === 1) {
          throw new Error('Simulated processing error');
        }
        console.log('Message processed successfully:', message);
      } catch (err) {
        console.error('Error in messageHandler:', err);
        throw err;
      }
    };

    // Start consuming messages (run indefinitely)
    await consumer.consume(messageHandler);

    // Handle process signals for a graceful shutdown
    process.on('SIGINT', async () => {
      console.log('Received SIGINT. Shutting down gracefully...');
      await consumer.close();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('Received SIGTERM. Shutting down gracefully...');
      await consumer.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('Consumer error:', error);
  }
};

runConsumer();
