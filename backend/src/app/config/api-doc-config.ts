import { SwaggerDefinition } from 'swagger-jsdoc';

const port = parseInt(process.env.APP_PORT);
const domain = process.env.APP_DOMAIN;

export const apiDefintion: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Certify.ly- API DOCUMENTATION',
    version: '1.0.0',
    description: 'Certify.ly Api',
    termsOfService: '',
    contact: {
      email: ''
    }
  },
  host: `${domain}:${port}`,
  basePath: '/',
  schemes: ['http', 'https'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'authorization',
      in: 'header'
    }
  }
};
