import { KafkaConfig } from 'kafkajs';
import env from './env';

const kafkaConf: KafkaConfig = {
  brokers: [env.KAFKA_BROKERS],
};

export default kafkaConf;
