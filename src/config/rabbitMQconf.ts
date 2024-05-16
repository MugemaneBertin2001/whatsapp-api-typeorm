import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import env from './env';

const rabbitMQConfig: ClientProviderOptions = {
  name: 'MESSAGE_SERVICE',
  transport: Transport.RMQ,
  options: {
    urls: [`amqp://${env.RABBITMQ_HOST}:${env.RABBITMQ_PORT}`],
    queue: 'message_queue',
    queueOptions: {
      durable: false,
    },
  },
};

export default rabbitMQConfig;
