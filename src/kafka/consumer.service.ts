import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopic,
  Kafka,
} from 'kafkajs';
import kafkaConf from 'src/config/kafkaConf';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka(kafkaConf);

  private readonly consumers: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({ groupId: 'nestjs-kafka' });

    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    await this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    this.consumers.forEach(async (consumer) => await consumer.disconnect());
  }
}
