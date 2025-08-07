import winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new WinstonCloudWatch({
      logGroupName: 'login-microservice',
      logStreamName: 'local-dev',
      awsRegion: process.env.AWS_REGION || 'us-east-1',
    }),
  ],
});

export default logger;
