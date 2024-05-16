const env = {
  // PostgreSQL configuration
  POSTGRES_URL:
    'postgres://default:I7E8KdqFkZhT@ep-young-bird-a4awun69-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
  // Kafka configuration
  KAFKA_BROKERS: 'localhost:9092',
  // RabbitMQ configuration
  RABBITMQ_HOST: 'localhost',
  RABBITMQ_PORT: 15672,
};

export default env;
