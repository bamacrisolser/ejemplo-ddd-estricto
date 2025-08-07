import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import AWSXRay from 'aws-xray-sdk';
import http from 'http';
import syntaxError from './shared/middleware/syntax-error.js';
import errorHandler from './shared/middleware/general-error.js';
import Routes from './router.js';

const app = express();

AWSXRay.captureHTTPsGlobal(http);

//Princial Middlewares
app.use(AWSXRay.express.openSegment('login-microservice'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(syntaxError);

//Principal route
app.use('/api', Routes);

//Not Fount handler
app.use('/', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

//Error handler
app.use(errorHandler);

app.use(AWSXRay.express.closeSegment());

export default app;