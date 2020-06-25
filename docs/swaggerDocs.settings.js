import dotenv from 'dotenv';
dotenv.config();

import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    info: {
        title: 'REST API for my App',
        version: '1.0.0',
        description: 'This is the REST API for my product',
    },
    host: 'localhost:5000',
    basePath: '/api'
};

const options = {
    swaggerDefinition,
    apis: ['./docs/**/*.yaml']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;


