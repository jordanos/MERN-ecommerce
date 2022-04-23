exports.options = {
  swaggerOptions: {
    authAction: {
      JWT: {
        name: 'JWT',
        schema: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: '',
        },
        value: 'Bearer <JWT>',
      },
    },
  },
};

exports.swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Todo API',
      description: 'Todo API documentaion.',
      contact: {
        name: 'Jordan',
        email: 'jordanoswork2021@gmail.com',
      },
      servers: ['http://localhost:5000'],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          name: 'authorization',
          scheme: 'bearer',
          in: 'header',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};
